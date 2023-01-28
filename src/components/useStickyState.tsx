import { useState, useEffect } from 'react';

type ControllerType = {
   page: number,
   rowsPerPage: number
}
export const useStickyState = (defaultValue: ControllerType, key: string) => {
   const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
         ? JSON.parse(stickyValue)
         : defaultValue;
   });
   useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
   }, [key, value]);
   return [value, setValue];
}