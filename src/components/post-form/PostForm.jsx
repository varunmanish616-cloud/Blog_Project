import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        await appwriteService.DeleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      
      const file = await appwriteService.uploadFile(data.image[0]);
      console.log(data);
      console.log(file)
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost=await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
//   const slugTransform = useCallback((value) => {
//     if (value && typeof value === "string")
//       return value
//         .trim()
//         .toLowerCase()
//         .replace(/^[a-zA-Z\d\s]+/g, "-")
//         .replace(/\s/g, "-");

//     return "";
//   }, []);
//i have to study
 const slugTransform=useCallback((value)=>{
        if(value && typeof value==='string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')
                .substring(0, 36)
                .replace(/^-+|-+$/g, '');

        return ''
    },[])
    
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-6xl mx-auto bg-gray-900 text-white rounded-2xl shadow-lg p-6 flex flex-wrap gap-6"
    >
      <div className="w-full md:w-2/3 space-y-5">
        <Input
          label="Title"
          placeholder="Write your post title..."
          className="bg-gray-800 border border-gray-700 rounded-lg"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="auto-generated slug"
          className="bg-gray-800 border border-gray-700 rounded-lg"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      
      <div className="w-full md:w-1/3 space-y-5">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <Input
            label="Featured Image"
            type="file"
            className="mb-2"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="mt-3">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full h-48 object-cover border border-gray-700"
              />
            </div>
          )}
        </div>

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="bg-gray-800 border border-gray-700 rounded-lg"
          {...register("status", { required: true })}
        />

        
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
          className="w-full py-3 text-lg font-semibold rounded-xl hover:scale-[1.02] transition-all"
        >
          {post ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
