export interface Blog {
    title: string;
    slug: string;
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    tags: string[];
    category: string;
    image: string;
    likes: string[];
    comment: {
        user: string;
        likes: string[];
        text: string;
        createdAt: string;
    }[];
    
}