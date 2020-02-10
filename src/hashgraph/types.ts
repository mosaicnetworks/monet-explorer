export type Event = {
	Body: {
		Transactions: any[];
		InternalTransactions: any[];
		Parents: string[];
		Creator: string;
		Index: number;
		BlockSignatures: any[];
	};
	Signature: string;
};
