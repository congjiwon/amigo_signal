export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          id: string;
          postId: string;
          userId: string;
        };
        Insert: {
          id?: string;
          postId: string;
          userId: string;
        };
        Update: {
          id?: string;
          postId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_postId_fkey';
            columns: ['postId'];
            referencedRelation: 'partnerPosts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmarks_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      interest: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      likes: {
        Row: {
          id: number;
          postId: string;
          userId: string;
        };
        Insert: {
          id?: number;
          postId: string;
          userId: string;
        };
        Update: {
          id?: number;
          postId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_postId_fkey';
            columns: ['postId'];
            referencedRelation: 'spotPosts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      location: {
        Row: {
          country: string[] | null;
          id: number;
          region: string;
        };
        Insert: {
          country?: string[] | null;
          id?: number;
          region?: string;
        };
        Update: {
          country?: string[] | null;
          id?: number;
          region?: string;
        };
        Relationships: [];
      };
      participate: {
        Row: {
          id: string;
          isInvolved: boolean;
          postId: string;
          userId: string;
        };
        Insert: {
          id?: string;
          isInvolved: boolean;
          postId: string;
          userId: string;
        };
        Update: {
          id?: string;
          isInvolved?: boolean;
          postId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'participate_postId_fkey';
            columns: ['postId'];
            referencedRelation: 'partnerPosts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'participate_userId_fkey';
            columns: ['userId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      partnerComments: {
        Row: {
          content: string;
          date: string;
          id: string;
          postId: string | null;
          writerId: string;
        };
        Insert: {
          content?: string;
          date?: string;
          id?: string;
          postId?: string | null;
          writerId: string;
        };
        Update: {
          content?: string;
          date?: string;
          id?: string;
          postId?: string | null;
          writerId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'partnerComments_postId_fkey';
            columns: ['postId'];
            referencedRelation: 'partnerPosts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'partnerComments_writerId_fkey';
            columns: ['writerId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      partnerPosts: {
        Row: {
          applicant: string;
          content: string;
          createdAt: string;
          endDate: string;
          flagUrl: string;
          id: string;
          interest: number[];
          isOpen: boolean;
          location: number;
          numOfPeople: number;
          openChat: string;
          startDate: string;
          title: string;
          writerId: string;
        };
        Insert: {
          applicant: string;
          content?: string;
          createdAt: string;
          endDate: string;
          flagUrl?: string;
          id?: string;
          interest: number[];
          isOpen?: boolean;
          location: number;
          numOfPeople: number;
          openChat?: string;
          startDate: string;
          title?: string;
          writerId: string;
        };
        Update: {
          applicant?: string;
          content?: string;
          createdAt?: string;
          endDate?: string;
          flagUrl?: string;
          id?: string;
          interest?: number[];
          isOpen?: boolean;
          location?: number;
          numOfPeople?: number;
          openChat?: string;
          startDate?: string;
          title?: string;
          writerId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'partnerPosts_applicant_fkey';
            columns: ['applicant'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'partnerPosts_location_fkey';
            columns: ['location'];
            referencedRelation: 'location';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'partnerPosts_writerId_fkey';
            columns: ['writerId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      spotComments: {
        Row: {
          content: string;
          date: string | null;
          id: string;
          postId: string | null;
          writerId: string;
        };
        Insert: {
          content?: string;
          date?: string | null;
          id?: string;
          postId?: string | null;
          writerId: string;
        };
        Update: {
          content?: string;
          date?: string | null;
          id?: string;
          postId?: string | null;
          writerId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'spotComments_postId_fkey';
            columns: ['postId'];
            referencedRelation: 'spotPosts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'spotComments_writerId_fkey';
            columns: ['writerId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      spotPosts: {
        Row: {
          address: string;
          content: string;
          createdAt: string;
          id: string;
          location: number;
          postImageUrl: string[] | null;
          starRate: number;
          title: string;
          visitDate: string;
          writerId: string;
        };
        Insert: {
          address?: string;
          content?: string;
          createdAt?: string;
          id?: string;
          location: number;
          postImageUrl?: string[] | null;
          starRate: number;
          title?: string;
          visitDate: string;
          writerId: string;
        };
        Update: {
          address?: string;
          content?: string;
          createdAt?: string;
          id?: string;
          location?: number;
          postImageUrl?: string[] | null;
          starRate?: number;
          title?: string;
          visitDate?: string;
          writerId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'spotPosts_location_fkey';
            columns: ['location'];
            referencedRelation: 'location';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'spotPosts_writerId_fkey';
            columns: ['writerId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          birthday: string;
          email: string;
          gender: string;
          id: string;
          nickName: string;
          profileImageUrl: string | null;
        };
        Insert: {
          birthday?: string;
          email?: string;
          gender?: string;
          id?: string;
          nickName?: string;
          profileImageUrl?: string | null;
        };
        Update: {
          birthday?: string;
          email?: string;
          gender?: string;
          id?: string;
          nickName?: string;
          profileImageUrl?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
