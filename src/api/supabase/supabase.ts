export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      applicants: {
        Row: {
          applicantId: string;
          content: string;
          id: string;
          isConfirmed: boolean;
          postId: {
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
          };
          isAccepted?: boolean;
          users?: {
            birthday: string;
            gender: string;
            nickName: string;
            profileImageUrl: string | null;
          };
        };
        Insert: {
          applicantId: string;
          content: string;
          id?: string;
          isConfirmed: boolean;
          postId: string;
          isAccepted?: boolean;
        };
        Update: {
          applicantId?: string;
          content?: string;
          id?: string;
          isConfirmed?: boolean;
          postId?: string;
          isAccepted?: boolean;
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
      countyInfo: {
        Row: {
          country: string;
          flagUrl: string;
          id: number;
          imageUrl: string;
        };
        Insert: {
          country: string;
          flagUrl: string;
          id?: number;
          imageUrl: string;
        };
        Update: {
          country?: string;
          flagUrl?: string;
          id?: number;
          imageUrl?: string;
        };
        Relationships: [];
      };
      interest: {
        Row: {
          content: string | null;
          id: number;
          imageUrl: string | null;
          name: string;
        };
        Insert: {
          content?: string | null;
          id?: number;
          imageUrl?: string | null;
          name: string;
        };
        Update: {
          content?: string | null;
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
          postId: string;
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
          postId?: string;
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
      reComments: {
        Row: {
          commentId: string;
          date: string;
          id: string;
          isUpdate: boolean;
          reContent: string;
          writerId: string;
          users?: {
            birthday: string;
            gender: string;
            nickName: string;
            profileImageUrl: string | null;
          };
        };
        Insert: {
          commentId?: string;
          date: string;
          id?: string;
          isUpdate: boolean;
          reContent: string;
          writerId?: string;
        };
        Update: {
          commentId?: string;
          date?: string;
          id?: string;
          isUpdate?: boolean;
          reContent?: string;
          writerId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reComments_commentId_fkey';
            columns: ['commentId'];
            referencedRelation: 'partnerComments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reComments_writerId_fkey';
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
          country: string;
          createdAt: string;
          id: string;
          latitude: number;
          longitude: number;
          postImageUrl: string[] | null;
          region: string;
          starRate: number;
          title: string;
          visitDate: string;
          writerId: string;
        };
        Insert: {
          address?: string;
          content?: string;
          country: string;
          createdAt?: string;
          id?: string;
          latitude: number;
          longitude: number;
          postImageUrl?: string[] | null;
          region: string;
          starRate: number;
          title?: string;
          visitDate: string;
          writerId: string;
        };
        Update: {
          address?: string;
          content?: string;
          country?: string;
          createdAt?: string;
          id?: string;
          latitude?: number;
          longitude?: number;
          postImageUrl?: string[] | null;
          region?: string;
          starRate?: number;
          title?: string;
          visitDate?: string;
          writerId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'spotPosts_writerId_fkey';
            columns: ['writerId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      spotReComments: {
        Row: {
          commentId: string;
          date: string;
          id: string;
          reContent: string;
          writerId: string;
        };
        Insert: {
          commentId: string;
          date: string;
          id?: string;
          reContent: string;
          writerId?: string;
        };
        Update: {
          commentId?: string;
          date?: string;
          id?: string;
          reContent?: string;
          writerId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'spotReComments_commentId_fkey';
            columns: ['commentId'];
            referencedRelation: 'spotComments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'spotReComments_writerId_fkey';
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
      get_applicants_with_users: {
        Args: Record<PropertyKey, never>;
        Returns: {
          applicant_id: string;
          content: string;
          id: string;
          is_confirmed: boolean;
          post_id: string;
          is_accepted: boolean;
          birthday: string;
          gender: string;
          nick_name: string;
          profile_image_url: string;
        }[];
      };
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
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];

export type TPartnerComment = Database['public']['Tables']['partnerComments']['Row'];
export type TPartnerInsert = Database['public']['Tables']['partnerComments']['Insert'];
export type TPartnerUpdate = Database['public']['Tables']['partnerComments']['Update'];

export type TPartnerReComments = Database['public']['Tables']['reComments']['Row'];
export type TPartnerReCommentsInsert = Database['public']['Tables']['reComments']['Insert'];
export type TPartnerReCommentsUpdate = Database['public']['Tables']['reComments']['Update'];
