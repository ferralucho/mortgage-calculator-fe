import './App.css';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [mortgageCalculation, setMortgageCalculation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (data) => {
    fetchMortgageCalculation();
  };

  const fetchMortgageCalculation = () => {
    axios
      .get('http://localhost:8082/mortgage/formula')
      .then((res) => {
        setMortgageCalculation(res.data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const numericAttributes = {
    type: "number",
    step: "5",
    min: "5",
    max: "30"
  }

  return (
    <div className="App">
      <header>
        <h2>
          Mortgage amortization calculator for Canada</h2>
        <span>
          Purchasing a home? Get a sense for your mortgage amortization payments, the cash you'll need to close and the monthly carrying costs.
        </span>
        <div>The minimum down payment in Canada is 5%. For down payments of less than 20%, home buyers are required to purchase mortgage amortization default insurance (CMHC insurance).</div>
      </header>

      <body>
        <div className="row">
          <div className='column'>
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
              <input {...register("downPayment", {
                required: true,
                maxLength: 20, pattern: /[0-9]+/i
              })} />
              {errors?.downPayment?.type === "required" && <p>This field is required</p>}
              {errors?.downPayment?.type === "maxLength" && (
                <p>Down Payment cannot exceed 20 characters</p>
              )}
              {errors?.downPayment?.type === "pattern" && (
                <p>Numbers only</p>
              )}
              <label>Amortization Period</label>
              <input {...numericAttributes} {...register("amortization", {
                required: true,
                maxLength: 20, min: 5, max: 30
              })} />
              {errors?.amortizationPeriod?.type === "required" && <p>This field is required</p>}
              {errors?.amortizationPeriod?.type === "maxLength" && (
                <p>Amortization Period cannot exceed 20 characters</p>
              )}
              {errors.amortization && (
                <p>Amortization period must be between 5 and 30 years</p>
              )}

              <label>Mortgage Rate</label>
              <input {...register("mortgageRate", {
                required: true,
                maxLength: 20, pattern: /[0-9]+/i
              })} />
              {errors?.mortgageRate?.type === "required" && <p>This field is required</p>}
              {errors?.mortgageRate?.type === "maxLength" && (
                <p>Down Payment cannot exceed 20 characters</p>
              )}
              {errors?.mortgageRate?.type === "pattern" && (
                <p>Numbers only</p>
              )}

              <input type="submit" />
              <span>{errorMessage}</span>
            </form>
          </div>
          <div className='column'>
            <div>
              Mortgage Calculation Result
            </div>
            <div className='item-container'>
              <div className='card'>
                <h5>Ratio between mortgage and down payment: {mortgageCalculation.difference_ratio}</h5>
                <h5> Mortgage amount before adding CHMC Insurance, it applies for high ratio loans: {mortgageCalculation.mortgage_before_chmc}</h5>
                <h5>Chmc Insurance Total Amount:{mortgageCalculation.chmc_insurance_total}</h5>
                <h5>Payment per payment amount: {mortgageCalculation.mortgage_payment_schedule}</h5>
                <h5>Mortgage Total: {mortgageCalculation.mortgage_total}</h5>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
