/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CreditCard, CheckCircle, Award, ShieldAlert, Sparkles, Plus, Check } from "lucide-react";
import { PaymentInvoice } from "../types";
import { mockInvoices, mockPlans } from "../data";

export default function BillingCenter() {
  const [invoices] = React.useState<PaymentInvoice[]>(mockInvoices);
  const [activePlan, setActivePlan] = React.useState("Enterprise Specialized Pro");

  const handleUpdatePlan = (planName: string) => {
    setActivePlan(planName);
    alert(`LMS license successfully migrated to: ${planName}! Outstanding balances calculated.`);
  };

  return (
    <div id="billing-center-container" className="space-y-6 transition-all duration-200">
      {/* active subscription details */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-2xl border border-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-900">
            Current Subscription License
          </span>
          <h2 className="text-lg font-extrabold mt-3 tracking-tight flex items-center gap-2">
            {activePlan}
            <Sparkles size={16} className="text-indigo-400 animate-pulse" />
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            Your academy is licensed with complete root administrator triggers, unlimited generative chats, and 1-on-1 feedback reviews.
          </p>
        </div>
        <div className="text-left md:text-right font-mono text-xs text-indigo-300">
          <p>Next invoicing: **July 01, 2026**</p>
          <p className="mt-1">Active portals linked: **Student / Teacher / Admin**</p>
        </div>
      </div>

      {/* Subscription Plans catalog list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlans.map((plan, idx) => {
          const isAct = plan.name === activePlan;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition flex flex-col justify-between ${
                isAct
                  ? "border-indigo-500 shadow-xl ring-1 ring-indigo-500 relative"
                  : "border-slate-200 dark:border-slate-800 shadow-sm"
              }`}
            >
              {isAct && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-mono text-[9px] font-bold py-0.5 px-3 rounded-full uppercase tracking-wider">
                  ACTIVE
                </span>
              )}
              <div>
                <h3 className="font-sans font-extrabold text-sm text-slate-950 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2.5 mb-4">
                  <span className="text-2xl font-black text-slate-950 dark:text-white">${plan.price}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">/ {plan.period}</span>
                </div>

                <ul className="space-y-2 border-t border-slate-55 dark:border-slate-850 pt-3.5 mt-2">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-slate-655 dark:text-slate-400 flex items-center gap-2 leading-relaxed">
                      <Check size={12} className="text-emerald-500 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleUpdatePlan(plan.name)}
                className={`w-full text-xs font-semibold py-2 rounded-xl transition mt-6 cursor-pointer ${
                  isAct
                    ? "bg-emerald-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow shadow-indigo-600/10"
                }`}
              >
                {isAct ? "Selected plan active" : "Upgrade to this"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment records invoices list logs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-202 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <h3 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <CreditCard size={18} className="text-indigo-600" />
          License Billing invoices & history
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-100 dark:divide-slate-800">
            <thead>
              <tr className="text-slate-400 uppercase font-mono tracking-wider">
                <th className="pb-3 font-bold">Invoice id</th>
                <th className="pb-3 font-bold">Billing Date</th>
                <th className="pb-3 font-bold">Plan Profile</th>
                <th className="pb-3 font-bold">Assigned Amount</th>
                <th className="pb-3 font-bold">Transaction Code</th>
                <th className="pb-3 font-bold text-right">Settlement State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
              {invoices.map((inv) => (
                <tr key={inv.id} className="text-slate-600 dark:text-slate-350">
                  <td className="py-3 font-bold text-slate-800 dark:text-white font-mono">{inv.id}</td>
                  <td className="py-3">{inv.date}</td>
                  <td className="py-3 font-medium">{inv.planName}</td>
                  <td className="py-3 font-mono font-semibold">${inv.amount}</td>
                  <td className="py-3 font-mono text-[10px] uppercase">{inv.transactionId}</td>
                  <td className="py-3 text-right">
                    <span className="bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-950/20 dark:text-emerald-400 py-0.5 px-2.5 rounded-full uppercase text-[9px] font-mono">
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
