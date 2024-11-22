import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchBlogPosts } from "../store/slices/blogSlice";
import {
  createPost,
  updatePost,
  deletePost,
  setEditingPost,
  clearEditingPost,
} from "../store/slices/adminSlice";
import { Pencil, Trash2 } from "lucide-react";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categories: z.string().min(1, "Categories are required"),
  tags: z.string().min(1, "Tags are required"),
});

type PostForm = z.infer<typeof postSchema>;

export default function BlogPostEditor() {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.blog);
  const { editingPost, loading, error } = useAppSelector((state) => state.admin);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: editingPost?.title || "",
      content: editingPost?.content || "",
      categories: editingPost?.categories.join(", ") || "",
      tags: editingPost?.tags.join(", ") || "",
    },
  });

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  useEffect(() => {
    if (editingPost) {
      reset({
        title: editingPost.title,
        content: editingPost.content,
        categories: editingPost.categories.join(", "),
        tags: editingPost.tags.join(", "),
      });
    }
  }, [editingPost, reset]);

  const onSubmit = async (data: PostForm) => {
    const postData = {
      title: data.title,
      content: data.content,
      categories: data.categories.split(",").map((c) => c.trim()),
      tags: data.tags.split(",").map((t) => t.trim()),
      date: new Date().toISOString().split("T")[0],
      author: "John Developer",
    };

    if (editingPost) {
      await dispatch(updatePost({ ...postData, id: editingPost.id }));
    } else {
      await dispatch(createPost(postData));
    }

    dispatch(fetchBlogPosts());
    reset();
  };

  const handleEdit = (post: typeof posts[0]) => {
    dispatch(setEditingPost(post));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await dispatch(deletePost(id));
      dispatch(fetchBlogPosts());
    }
  };

  const handleClear = () => {
    dispatch(clearEditingPost());
    reset({
      title: "",
      content: "",
      categories: "",
      tags: "",
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("title")}
                placeholder="Post title"
                disabled={loading}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Textarea
                {...register("content")}
                placeholder="Post content (Markdown supported)"
                className="min-h-[200px]"
                disabled={loading}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                {...register("categories")}
                placeholder="Categories (comma-separated)"
                disabled={loading}
              />
              {errors.categories && (
                <p className="text-sm text-red-500">
                  {errors.categories.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                {...register("tags")}
                placeholder="Tags (comma-separated)"
                disabled={loading}
              />
              {errors.tags && (
                <p className="text-sm text-red-500">{errors.tags.message}</p>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter className="gap-2">
            <Button type="submit" disabled={loading}>
              {loading
                ? editingPost
                  ? "Updating..."
                  : "Creating..."
                : editingPost
                ? "Update Post"
                : "Create Post"}
            </Button>
            {editingPost && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                disabled={loading}
              >
                Cancel Edit
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Existing Posts</h2>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(post)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
