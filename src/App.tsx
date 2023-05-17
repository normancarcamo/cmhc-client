import { useState } from "react";

import serviceApi from "./utils/api.service";

import { Input } from "./components/Input";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function App() {
  const [totalMonthPayment, setTotalMonthlyPayment] = useState("");
  const [totalMonthsPayments, setTotalMonthsPayments] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    serviceApi
      .calculateMortage(Object.fromEntries(formData.entries()))
      .then((result) => {
        const { payment } = (result as any).cmhc;
        setTotalMonthlyPayment(formatter.format(payment.monthlyPayment));
        setTotalMonthsPayments(payment.months);
      })
      .catch((error) => console.error(error.message));
  };

  const handleFormReset = () => {
    setTotalMonthlyPayment("");
    setTotalMonthsPayments("");
  };

  const areTotalsAvailable = totalMonthPayment && totalMonthsPayments;

  return (
    <section className="flex flex-col p-8 items-center justify-center">
      <h1 className="font-bold text-3xl leading-tight tracking-tight text-gray-900 md:text-5x text-center mb-2 md:mt-10 max-w-4xl">
        Mortgage Payment Calculator Canada
      </h1>
      <p className="text-center">
        Simple mortgage calculator using React.js and Node.js
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-10 mx-auto w-full">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Mortage Calculator
            </h1>
            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 md:space-y-6"
            >
              <Input
                id="property-price"
                name="propertyPrice"
                label="Property Price $"
                type="number"
              />
              <Input
                id="down-payment"
                name="downPayment"
                label="Down Payment $"
                type="number"
              />
              <Input
                id="annual-interest-rate"
                name="annualInterestRate"
                label="Annual Interest Rate %"
                step={0.01}
                type="number"
              />
              <Input
                id="amortization-period"
                name="amortizationPeriod"
                label="Amortization Period (Term)"
                type="select"
                defaultValue={{ value: 25, label: "25 years" }}
                options={[
                  { value: 5, label: "5 years" },
                  { value: 10, label: "10 years" },
                  { value: 15, label: "15 years" },
                  { value: 20, label: "20 years" },
                  { value: 25, label: "25 years" },
                  { value: 30, label: "30 years" },
                ]}
              />
              <Input
                id="payment-scheduled"
                name="paymentScheduled"
                label="Payment Scheduled"
                type="select"
                defaultValue={{ value: "monthly", label: "Monthly" }}
                options={[
                  { value: "bi-weekly", label: "Bi-weekly" },
                  {
                    value: "accelerate-bi-weekly",
                    label: "Accelerate Bi-weekly",
                  },
                  { value: "monthly", label: "Monthly" },
                ]}
              />
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Calculate
              </button>
              <button
                type="reset"
                className="w-full text-primary-600 bg-white ring-2 hover:bg-primary-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleFormReset}
              >
                Reset
              </button>
            </form>
          </div>
        </div>
        {areTotalsAvailable && (
          <div className="grid grid-cols-2 md:grid-cols-1 grid-flow-row-dense justify-stretch w-full sm:max-w-md md:max-w-xs gap-10">
            <div>
              <span className="text-xl md:text-4xl font-bold text-primary-600">
                {totalMonthPayment}
              </span>
              <h3>Total monthly payment</h3>
            </div>
            <div>
              <span className="text-xl md:text-4xl font-bold text-primary-600">
                {totalMonthsPayments}
              </span>
              <h3>Total months to pay</h3>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
