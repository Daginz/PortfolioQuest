import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchBlogPosts,
  setCurrentPage,
  setCategory,
  setSearchQuery,
  setSortOrder,
} from "../store/slices/blogSlice";
import BlogPost from "./BlogPost";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown } from "lucide-react";

export default function BlogList() {
  const dispatch = useAppDispatch();
  const {
    posts,
    loading,
    error,
    currentPage,
    postsPerPage,
    selectedCategory,
    searchQuery,
    sortOrder,
  } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  // Get unique categories from posts
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.categories))
  );

  // Filter and sort posts
  const filteredPosts = posts
    .filter((post) =>
      selectedCategory ? post.categories.includes(selectedCategory) : true
    )
    .filter((post) =>
      searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="flex-1"
        />
        <Select
          value={selectedCategory || "all"}
          onValueChange={(value) =>
            dispatch(setCategory(value === "all" ? null : value))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(setSortOrder(sortOrder === "desc" ? "asc" : "desc"))
          }
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          {sortOrder === "desc" ? "Newest First" : "Oldest First"}
        </Button>
      </div>

      <div className="space-y-6">
        {loading ? (
          Array.from({ length: postsPerPage }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
          ))
        ) : paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No posts found
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
