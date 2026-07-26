import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Balance = () => {
  const [payments, setPayments] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://ironpulse-server-silk.vercel.app/payments')
      .then(res => {
        setPayments(res.data);
        
        const total = res.data.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
        setTotalBalance(total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-emerald-400 font-bold p-6">Loading Balance & Transactions...</div>;
  }

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Financial <span className="text-emerald-400">Balance</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Monitor revenue and payment history for IronPulse.</p>
      </div>

      
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-lg flex items-center justify-between max-w-md">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Platform Revenue</p>
          <h2 className="text-4xl font-black text-emerald-400 mt-2">${totalBalance}</h2>
        </div>
        <div className="bg-emerald-500/10 p-4 rounded-xl text-4xl">💰</div>
      </div>

      
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Recent Transactions</h2>

        {payments.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl text-center">
            <p className="text-slate-400 text-lg">No payment transactions recorded yet.</p>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-lg">
            <table className="w-full text-left text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400 uppercase text-xs tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Class / Slot</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white">{payment.userName || 'Member'}</p>
                      <p className="text-slate-400 text-xs">{payment.userEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-emerald-400 font-semibold">{payment.className || 'Slot Session'}</td>
                    <td className="px-6 py-4 font-bold text-amber-400">${payment.price}</td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">{payment.transactionId || 'N/A'}</td>
                    <td className="px-6 py-4 text-right text-sm text-slate-400">
                      {payment.date ? new Date(payment.date).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Balance;