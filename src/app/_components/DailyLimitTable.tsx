import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function DailyLimitTable() {
  return (
    <>
      <Table className="">
        <TableHeader className="bg-primary text-white">
          <TableRow>
            <TableHead className="w-[100px] text-white">Wallet</TableHead>
            <TableHead className="text-white">Withdrawal Limit</TableHead>
            <TableHead className="text-white">Deposit Limit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">USD</TableCell>
            <TableCell>1,000.00</TableCell>
            <TableCell>5,000.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">EUR</TableCell>
            <TableCell>800.00</TableCell>
            <TableCell>4,000.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GBP</TableCell>
            <TableCell>1,200.00</TableCell>
            <TableCell>6,000.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
