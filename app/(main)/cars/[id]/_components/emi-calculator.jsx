"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function EmiCalculator({ price=1000 }) {
  const [vehiclePrice, setVehiclePrice] = useState(price);
  const [downPayment, setDownPayment] = useState(2000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(36);
  const [emi, setEmi] = useState(0);

  const loanAmount = vehiclePrice - downPayment;

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const ratePerMonth = parseFloat(interestRate) / (12 * 100);
    const months = parseFloat(loanTerm);

    if (principal <= 0 || isNaN(principal)) {
      setEmi("0.00");
      return;
    }

    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) /
      (Math.pow(1 + ratePerMonth, months) - 1);
    setEmi(emi.toFixed(2));
  };

  useEffect(() => {
    calculateEMI();
  }, [vehiclePrice, downPayment, interestRate, loanTerm]);

  const InputWithSlider = ({
    label,
    value,
    onChange,
    min,
    max,
    step,
    unit,
  }) => (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          color: "#2c3e50",
          fontSize: "15px",
          fontWeight: "500",
        }}
      >
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            height: "8px",
            borderRadius: "4px",
            WebkitAppearance: "none",
            background: "linear-gradient(to right, #3498db, #2980b9)",
          }}
        />
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "120px",
            padding: "10px",
            borderRadius: "6px",
            border: "2px solid #e0e0e0",
            fontSize: "14px",
            transition: "border-color 0.3s",
            outline: "none",
            ":focus": {
              borderColor: "#3498db",
            },
          }}
        />
        <span
          style={{
            minWidth: "50px",
            color: "#7f8c8d",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {unit}
        </span>
      </div>
    </div>
  );

  const totalPayments = parseFloat(emi) * loanTerm;
  const totalInterest = totalPayments - loanAmount;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        padding: "30px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            color: "#2c3e50",
            fontSize: "32px",
            marginBottom: "10px",
            fontWeight: "600",
          }}
        >
          SmartWheelz EMI Calculator
        </h1>
        <p
          style={{
            color: "#7f8c8d",
            fontSize: "16px",
            margin: "0",
          }}
        >
          Calculate your monthly car payments easily
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          padding: "40px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div
          style={{
            padding: "30px",
            background: "#f8f9fa",
            borderRadius: "12px",
          }}
        >
          <InputWithSlider
            label="Vehicle Price"
            value={vehiclePrice}
            onChange={setVehiclePrice}
            min={1000}
            max={100000}
            step={1000}
            unit="USD"
          />

          <InputWithSlider
            label="Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            min={0}
            max={vehiclePrice}
            step={500}
            unit="USD"
          />

          <InputWithSlider
            label="Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            min={1}
            max={20}
            step={0.1}
            unit="%"
          />

          <InputWithSlider
            label="Loan Term"
            value={loanTerm}
            onChange={setLoanTerm}
            min={12}
            max={84}
            step={12}
            unit="mo"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "30px",
            background: "#f8f9fa",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <h2
              style={{
                color: "#2c3e50",
                margin: "0 0 5px 0",
                fontSize: "20px",
              }}
            >
              Monthly Payment
            </h2>
            <div
              style={{
                fontSize: "48px",
                color: "#2980b9",
                fontWeight: "bold",
                margin: "20px 0",
              }}
            >
              ${emi}
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span style={{ color: "#7f8c8d" }}>Vehicle Price</span>
                <span style={{ color: "#2c3e50", fontWeight: "500" }}>
                  ${vehiclePrice.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span style={{ color: "#7f8c8d" }}>Down Payment</span>
                <span style={{ color: "#2c3e50", fontWeight: "500" }}>
                  ${downPayment.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span style={{ color: "#7f8c8d" }}>Loan Amount</span>
                <span style={{ color: "#2c3e50", fontWeight: "500" }}>
                  ${loanAmount.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  background: "#f8f9fa",
                  borderRadius: "6px",
                  marginTop: "10px",
                }}
              >
                <span style={{ color: "#2c3e50", fontWeight: "600" }}>
                  Total Interest
                </span>
                <span style={{ color: "#2980b9", fontWeight: "600" }}>
                  $
                  {totalInterest.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmiCalculator;