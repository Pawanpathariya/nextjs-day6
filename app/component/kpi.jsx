import { useTheme } from "next-themes";
const Kpi = () => {
  const { theme } = useTheme();

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} p-4 rounded-md shadow-md`}>
        <h2 className="text-xl font-semibold">Total Sales</h2>
        <p className="text-3xl font-bold">$12,000</p>
      </div>
      <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} p-4 rounded-md shadow-md`}>
        <h2 className="text-xl font-semibold">Total Customers</h2>
        <p className="text-3xl font-bold">1000</p>
      </div>
      <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} p-4 rounded-md shadow-md`}>
        <h2 className="text-xl font-semibold">Total Orders</h2>
        <p className="text-3xl font-bold">5000</p>
      </div>
      <div className={`bg-${theme === 'dark' ? 'gray-800' : 'white'} p-4 rounded-md shadow-md`}>
        <h2 className="text-xl font-semibold">Total Revenue</h2>
        <p className="text-3xl font-bold">$500,000</p>
      </div>
    </div>
  );
};

export default Kpi;

