import { Card } from "./Card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {transaction.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + RS {(transaction.amount / 100).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
