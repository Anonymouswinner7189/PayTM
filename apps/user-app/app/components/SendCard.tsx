"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Center } from "./Center";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { p2pTransfer } from "../api/lib/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send Money">
          <div className="pt-2">
            <TextInput
              label="Number"
              placeholder="Number"
              onChange={(value) => setNumber(value)}
            />
            <TextInput
              label="Amount"
              placeholder=" Amount"
              onChange={(value) => setAmount(value)}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  await p2pTransfer({
                    to: number,
                    amount: Number(amount) * 100,
                  });
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
