import './App.css';
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  console.log(watch("example")); 

  return (
    <div className="App">
      <header className="App-header">
      <h2>
          Mortgage amortization calculator for Canada</h2>
        <span>
        Purchasing a home? Get a sense for your mortgage amortization payments, the cash you'll need to close and the monthly carrying costs.
        </span>
        <div>The minimum down payment in Canada is 5%. For down payments of less than 20%, home buyers are required to purchase mortgamortization default insurance (CMHC insurance).</div>
   
      <body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Property Price</label>
          <input
            {...register("propertyPrice", {
              required: true,
              maxLength: 20,
              pattern: /[0-9]+/i
            })}
          />
            {errors?.propertyPrice?.type === "required" && <p>This field is required</p>}
            {errors?.propertyPrice?.type === "maxLength" && (
              <p>Property Price cannot exceed 20 characters</p>
            )}
            {errors?.propertyPrice?.type === "pattern" && (
              <p>Numbers only</p>
            )}
            <label>Down Payment</label>
            <input {...register("downPayment", { pattern: /[0-9]+/i })} />
            {errors?.downPayment?.type === "pattern" && (
              <p>Numbers only</p>
            )}
            <label>Amortization Period</label>
            <input {...register("amortization", { min: 5, max: 30 })} />
            {errors.amortization && (
              <p>Amortization period must be between 5 and 30 years</p>
            )}

            <label>Mortgage Rate</label>
            <input {...register("mortgageRate", { pattern: /[0-9]+/i })} />
            {errors?.mortgageRate?.type === "pattern" && (
              <p>Numbers only</p>
            )}
      
            <input type="submit" />
        </form>
      </body>
      </header>
    </div>
  );
}

export default App;
