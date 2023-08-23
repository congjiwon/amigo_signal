export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      applicants: {
        Row: {
          applicantId: string;
          content: string;
          id: string;
          isInvolved: string;
          postId: string;
        };
        Insert: {
          applicantId: string;
          content: string;
          id?: string;
          isInvolved: string;
          postId: string;
        };
        Update: {
          applicantId?: string;
          content?: string;
          id?: string;
          isInvolved?: string;
          postId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'applicants_applicantId_fkey';
            columns: ['applicantId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'applicants_postId_fkey';
            columns: ['postId'];
            referencedRelation: 'partnerPosts';
            referencedColumns: ['id'];
          },
        ];
      };
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
          imageUrl: string | null;
          name: string;
        };
        Insert: {
          id?: number;
          imageUrl?: string | null;
          name: string;
        };
        Update: {
          id?: number;
          imageUrl?: string | null;
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
      partnerComments: {
        Row: {
          content: string;
          date: string;
          id: string;
          postId: string | null;
          writerId: string;
        };
        Insert: {
          content: string;
          date?: string;
          id?: string;
          postId?: string;
          writerId?: string;
        };
        Update: {
          content?: string;
          date?: string;
          id?: string;
          writerId: string;
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
          content: string;
          country: string;
          createdAt: string;
          endDate: string;
          id: string;
          interestUrl: string[];
          isOpen: boolean;
          numOfPeople: number;
          openChat: string;
          region: string;
          startDate: string;
          title: string;
          writerId: string | null;
          users: {
            birthday: string;
            gender: string;
            nickName: string;
            profileImageUrl: string | null;
          };
        };
        Insert: {
          content?: string;
          country: string;
          createdAt: string;
          endDate: string;
          id?: string;
          interestUrl: string[];
          isOpen?: boolean;
          numOfPeople: number;
          openChat?: string;
          region: string;
          startDate: string;
          title?: string;
          writerId?: string | null;
        };
        Update: {
          content?: string;
          country?: string;
          createdAt?: string;
          endDate?: string;
          id?: string;
          interestUrl?: string[];
          isOpen?: boolean;
          numOfPeople?: number;
          openChat?: string;
          region?: string;
          startDate?: string;
          title?: string;
          writerId?: string | null;
        };
        Relationships: [
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
          birthday: string;
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
export type TPartnerComment = Database['public']['Tables']['partnerComments']['Row'];
export type TPartnerInsert = Database['public']['Tables']['partnerComments']['Insert'];
export type TPartnerUpdate = Database['public']['Tables']['partnerComments']['Update'];
