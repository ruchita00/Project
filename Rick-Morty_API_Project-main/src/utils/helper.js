export const getStatusColor=(status)=>{
    switch(status){
        case 'Alive':
            return 'green';
        case 'Dead':
            return 'red';
        default:
            return 'gray';
    }
}

export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }