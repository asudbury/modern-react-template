import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Button } from '../../src/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Separator,
} from '@/components/shadcn';
import { fetchData } from '../../src/queries/fetch';
import { mutateData } from '../../src/queries/mutate';
import { postSchema, type Post } from '../../src/schemas/api';
import { z } from 'zod';

/**
 * SampleDataFetching Component
 *
 * Demonstrates:
 * - TanStack Query for server state management
 * - Data fetching with loading and error states
 * - Mutations with optimistic updates
 * - Zod schema validation for API responses
 * - Accessible data display with proper ARIA attributes
 * - No inline event handlers (useCallback)
 *
 * This is a SAMPLE component for educational purposes.
 * DELETE this file and the entire samples/ directory before deploying to production.
 *
 * @example
 * ```tsx
 * <SampleDataFetching />
 * ```
 */

// Mock API base URL (would be in environment variables in real app)
const API_BASE = 'https://jsonplaceholder.typicode.com';

// Schema for the posts list
const postsListSchema = z.array(postSchema);

/**
 * Fetch posts from the API
 */
async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE}/posts?_limit=5`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Map API data to our schema format
    const mappedData = data.map((item: any) => ({
      id: String(item.id),
      title: item.title,
      content: item.body,
      authorId: String(item.userId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    // Validate with Zod
    return postsListSchema.parse(mappedData);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

/**
 * Create a new post
 */
async function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
  try {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: post.title,
        body: post.content,
        userId: parseInt(post.authorId, 10),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Map response to our schema format
    const mappedData = {
      id: String(data.id),
      title: data.title,
      content: data.body,
      authorId: String(data.userId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Validate with Zod
    return postSchema.parse(mappedData);
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export function SampleDataFetching() {
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch posts using TanStack Query
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5000, // Consider data fresh for 5 seconds
    retry: 2, // Retry failed requests twice
  });

  // Create post mutation
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts after successful creation
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setShowCreateForm(false);
    },
  });

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleToggleForm = useCallback(() => {
    setShowCreateForm((prev) => !prev);
  }, []);

  const handleCreatePost = useCallback(() => {
    const newPost = {
      title: 'Sample Post',
      content: 'This is a sample post created with TanStack Query mutation',
      authorId: '1',
    };

    createMutation.mutate(newPost);
  }, [createMutation]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Sample Data Fetching Component
      </h2>

      <Alert variant="default" className="mb-6">
        <AlertTitle>⚠️ Sample Component</AlertTitle>
        <AlertDescription>
          This demonstrates TanStack Query for data fetching and mutations.
          DELETE the samples/ directory before production.
        </AlertDescription>
      </Alert>

      <div className="flex gap-4 mb-6">
        <Button variant="primary" onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh Data'}
        </Button>
        <Button variant="secondary" onClick={handleToggleForm}>
          {showCreateForm ? 'Cancel' : 'Create New Post'}
        </Button>
      </div>

      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>
              Click below to create a sample post (mutation example)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="accent"
              onClick={handleCreatePost}
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Creating...' : 'Create Sample Post'}
            </Button>
            {createMutation.isError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to create post: {createMutation.error.message}
                </AlertDescription>
              </Alert>
            )}
            {createMutation.isSuccess && (
              <Alert variant="default" className="mt-4">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Post created successfully and data refreshed.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="text-center py-8" role="status" aria-live="polite">
          <p className="text-lg text-text-secondary">Loading posts...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error Loading Data</AlertTitle>
          <AlertDescription>
            Failed to fetch posts: {error.message}
          </AlertDescription>
        </Alert>
      )}

      {posts && posts.length > 0 && (
        <div className="space-y-4" role="region" aria-label="Posts list">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-text-primary">
              Posts ({posts.length})
            </h3>
            <Badge variant="secondary">Fresh Data</Badge>
          </div>
          
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <Badge variant="outline">ID: {post.id}</Badge>
                </div>
                <CardDescription>
                  Author ID: {post.authorId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">{post.content}</p>
                <Separator className="my-4" />
                <div className="flex gap-4 text-sm text-text-tertiary">
                  <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {posts && posts.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-text-secondary">No posts found</p>
        </div>
      )}
    </div>
  );
}
