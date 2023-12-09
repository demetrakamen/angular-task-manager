export interface Task {
    id: number;
    title: string;
    color?: string;
    starts: Date;
    ends: Date;
    date?: Date;
    duration?: number;
    priority?: string;
    alert?: boolean;
    done?: boolean;
    upcoming?: boolean;
    description?: string;
    notes?: Array<string>;
    overlapping: Array<string>, 
    User?: {
      name: string
    };
    user_id: number,
    __typename?: 'Task'
}






