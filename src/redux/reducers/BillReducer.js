import { ACTION_TYPES } from '../actions/ActionTypes';

let initialState = {
  billData: [
    {
      "id": 1,
      "description": "Dominoes",
      "category": "FoodNDining",
      "amount": "430",
      "date": "01-02-2020"
    },
    {
      "id": 2,
      "description": "Car wash",
      "category": "utility",
      "amount": "500",
      "date": "01-06-2020"
    },
    {
      "id": 3,
      "description": "Amazon",
      "category": "shopping",
      "amount": "2030",
      "date": "01-07-2020"
    },
    {
      "id": 4,
      "description": "House rent",
      "category": "Food & Dining",
      "amount": "35900",
      "date": "01-03-2020"
    },
    {
      "id": 5,
      "description": "Tuition", "category": "education", "amount": "2200",
      "date": "01-12-2021"
    },
    {
      "id": 6,
      "description": "Laundry", "category": "Personal Care", "amount": "320",
      "date": "01-14-2020"
    },
    {
      "id": 7,
      "description": "Vacation", "category": "Travel",
      "amount": "3430",
      "date": "02-18-2020"
    }
  ],
};

const BillReducer = (state = initialState, action) => {
  const {
    payload
  } = action;
  switch (action.type) {
    case ACTION_TYPES.ADD_BILL:
      return {
        ...state,
        billData: [...state.billData, payload],
      };
    case ACTION_TYPES.EDIT_BILL:
      return {
        ...state,
        billData: state.billData.map((data) => {
          return data.id === payload.id ? payload : data;
        }),
      };
    case ACTION_TYPES.DELETE_BILL:
      return {
        ...state,
        billData: state.billData.filter((data) => data.id !== payload),
      };
    default:
      return state;
  }
};

export default BillReducer;