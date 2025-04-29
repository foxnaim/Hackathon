interface Props {
 onSearch: (value: string) => void;
}

const TrendSearch = ({ onSearch }: Props) => {
 return (
   <input
     type="text"
     onChange={(e) => onSearch(e.target.value)}
     placeholder="Поиск трендов..."
     className="w-full p-2 border rounded-xl mb-6"
   />
 );
};

export default TrendSearch;
