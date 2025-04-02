export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Passing_Characteristic: {
        Row: {
          accuracy: number
          arm: string
          created_at: string
          espnid: string
          id: number
          play_extension: number
          processing: number
        }
        Insert: {
          accuracy: number
          arm?: string
          created_at?: string
          espnid: string
          id?: number
          play_extension: number
          processing: number
        }
        Update: {
          accuracy?: number
          arm?: string
          created_at?: string
          espnid?: string
          id?: number
          play_extension?: number
          processing?: number
        }
        Relationships: []
      }
      Passing_Stats: {
        Row: {
          cpoe: number
          created_at: string
          epaperplay: number
          espnid: string
          id: number
          p2s: number
          tdintratio: number
          ttt: number
          ypa: number
        }
        Insert: {
          cpoe?: number
          created_at?: string
          epaperplay: number
          espnid: string
          id?: number
          p2s: number
          tdintratio?: number
          ttt: number
          ypa: number
        }
        Update: {
          cpoe?: number
          created_at?: string
          epaperplay?: number
          espnid?: string
          id?: number
          p2s?: number
          tdintratio?: number
          ttt?: number
          ypa?: number
        }
        Relationships: []
      }
      Player_Team: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          nfl: boolean
          notes: string
          player_espnid: string
          start_date: string
          team_id: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: number
          nfl?: boolean
          notes?: string
          player_espnid: string
          start_date: string
          team_id: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: number
          nfl?: boolean
          notes?: string
          player_espnid?: string
          start_date?: string
          team_id?: string
        }
        Relationships: []
      }
      Players: {
        Row: {
          age: number
          attributes: Json
          contract: number
          created_at: string
          espnid: string
          height: number
          id: number
          name: string
          number: string
          position: string
          teamid: string
          weight: number
        }
        Insert: {
          age: number
          attributes?: Json
          contract?: number
          created_at?: string
          espnid: string
          height: number
          id?: number
          name: string
          number?: string
          position: string
          teamid: string
          weight: number
        }
        Update: {
          age?: number
          attributes?: Json
          contract?: number
          created_at?: string
          espnid?: string
          height?: number
          id?: number
          name?: string
          number?: string
          position?: string
          teamid?: string
          weight?: number
        }
        Relationships: []
      }
      Rushing_Stat: {
        Row: {
          broken_tackle: number | null
          created_at: string
          espnid: string
          explosive: number | null
          fumble: number | null
          id: number
          rush_epa: number | null
          yac: number | null
        }
        Insert: {
          broken_tackle?: number | null
          created_at?: string
          espnid: string
          explosive?: number | null
          fumble?: number | null
          id?: number
          rush_epa?: number | null
          yac?: number | null
        }
        Update: {
          broken_tackle?: number | null
          created_at?: string
          espnid?: string
          explosive?: number | null
          fumble?: number | null
          id?: number
          rush_epa?: number | null
          yac?: number | null
        }
        Relationships: []
      }
      Team: {
        Row: {
          abbreviation: string
          color: string
          created_at: string
          division: string
          espnid: string
          hc: string
          id: number
          name: string
          oc: string
          secondary_color: string
        }
        Insert: {
          abbreviation?: string
          color: string
          created_at?: string
          division?: string
          espnid: string
          hc?: string
          id?: number
          name: string
          oc?: string
          secondary_color?: string
        }
        Update: {
          abbreviation?: string
          color?: string
          created_at?: string
          division?: string
          espnid?: string
          hc?: string
          id?: number
          name?: string
          oc?: string
          secondary_color?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_rushing_stat_rank: {
        Args: {
          espn_id: string
          stat_column: string
        }
        Returns: {
          rank: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
