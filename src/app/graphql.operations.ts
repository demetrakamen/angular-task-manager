import { gql } from 'apollo-angular';

const GET_TASK = gql`
  {
    Task(id: 1) {
      id
      title
      color
      starts
      ends
      duration
      priority
      notification
      done
      notes
      upcoming
      description
      User {
        name
      }
    }
  }
`;

const GET_TASKS_BY_DATE = gql`
  query TaskFilter($date: Date!){
    allTasks(filter: { date: $date }) {
      id
      title
      color
      starts
      date
      ends
      duration
      priority
      notification
      done
      notes
      upcoming
     overlapping
      description
      User {
        name
      }
    }
  }
`;

const GET_ALL_TASKS = gql`
  {
    allTasks {
      id
      title
      color
      starts
      date
      ends
      duration
      priority
      notification
      done
      notes
      upcoming
      description
      User {
        name
      }
    }
  }
`;

const DELETE_TASK = gql`
  mutation RemoveTask($id: ID!) {
    removeTask(id: $id) {
      id
      title
      user_id
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String!
    $color: String!
    $starts: Date!
    $ends: Date!
    $date: Date!
    $duration: Int!
    $priority: String!
    $notification: Boolean!
    $done: Boolean!
    $upcoming: Boolean!
    $description: String!
    $notes: [String!]
  ) {
    updateTask(
      id: $id
      title: $title
      color: $color
      starts: $starts
      ends: $ends
      date: $date
      duration: $duration
      priority: $priority
      notification: $notification
      done: $done
      notes: $notes
      upcoming: $upcoming
      description: $description
    ) {
      id
      title
      color
      starts
      ends
      duration
      priority
      notification
      done
      notes
      upcoming
      description
      User {
        name
      }
    }
  }
`;

const MARK_TASK_DONE = gql`
  mutation UpdateTask(
    $id: ID!
    $done: Boolean!
  ) {
    updateTask(
      id: $id
      done: $done
    ) {
      id
      done
    }
  }
`;

const ADD_TASK = gql`
  mutation CreateTask(
    $title: String!
    $color: String!
    $starts: Date!
    $ends: Date!
    $date: Date!
    $duration: Int!
    $priority: String!
    $notification: Boolean!
    $done: Boolean!
    $upcoming: Boolean!
    $description: String!
    $notes: [String!]
    $overlapping: [String]!
    $user_id: ID!
  ) {
    createTask(
      title: $title
      color: $color
      starts: $starts
      ends: $ends

      date: $date
      duration: $duration
      priority: $priority
      notification: $notification
      done: $done
      notes: $notes
      overlapping: $overlapping
      upcoming: $upcoming,
      description: $description
      user_id: $user_id
    ) {
      id
      title
      color
      starts
      ends
      duration
      priority
      notification
      done
      notes
      upcoming
      overlapping
      description
      User {
        name
      }
    }
  }
`;

export { GET_TASK, GET_ALL_TASKS, DELETE_TASK, ADD_TASK, UPDATE_TASK, GET_TASKS_BY_DATE, MARK_TASK_DONE };
