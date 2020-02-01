import React, { createContext, useReducer, useContext } from "react";
import { ICategory, IToDo } from "./interfaces";
import uuid from "uuid";

const defaultTasks: IToDo[] = [
  {
    id: uuid.v4(),
    category: "day-job",
    title: "trading-hub",
    remaining: 4
  },
  {
    id: uuid.v4(),
    category: "day-job",
    title: "trading-platform",
    remaining: 6
  }
];

const UNCATEGORIZED = "Uncategorized";
const defaultCats: ICategory[] = [
  { id: uuid.v4(), name: UNCATEGORIZED },
  { id: uuid.v4(), name: "Work" },
  { id: uuid.v4(), name: "Home" },
  { id: uuid.v4(), name: "TTC" },
  { id: uuid.v4(), name: "Car" },
  { id: uuid.v4(), name: "Berlin" }
];

const ADD_TO_DO = "ADD_TO_DO";
const REMOVE_TO_DO = "REMOVE_TO_DO";
const ADD_ONE_TO_COUNT = "ADD_ONE_TO_COUNT";
const REM_ONE_TO_COUNT = "REM_ONE_TO_COUNT";

const toDoReducer = (state = defaultTasks, action = {}) => {
  switch (action.type) {
    case ADD_TO_DO:
      return [
        {
          id: uuid.v4(),
          title: action.payload.title,
          category: action.payload.catName,
          remaining: 1
        },
        ...state
      ];
  }
};
