import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/* Use throughout your app instead of plain `useDispatch` and `useSelector`
This allows for types to be applied automatcially every single time you use useSelector/useDispatch
rather than having to predefine it every time */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
