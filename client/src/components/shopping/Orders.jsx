import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"


function Shoppingorders() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>
            All orders
            </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>123456</TableCell>
                <TableCell>12/10/2023</TableCell>
                <TableCell>Processed</TableCell>
                <TableCell>3400</TableCell>
                <TableCell>
                  <Button>View Details</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
    </Card>
  )
}

export default Shoppingorders
