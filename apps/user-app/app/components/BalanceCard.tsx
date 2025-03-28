import { Card } from "./Card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unlocked Amount</div>
        <div>{(amount / 100).toFixed(2)} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Locked Amount</div>
        <div>{(locked / 100).toFixed(2)} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Total Balance</div>
        <div>{((amount + locked) / 100).toFixed(2)} INR</div>
      </div>
    </Card>
  );
};
