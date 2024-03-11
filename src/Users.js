import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "./api/interceptor";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LoadingContext } from "./context/LoadingContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { setLoading } = useContext(LoadingContext);

  const usersFun = async () => {
    try {
      setLoading(true);
      const resp = await getUsers();
      console.log(resp.users);
      setUsers(resp.users);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    usersFun();
  }, []);

  return (
    <div>
      <h1>Users({users.length})</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">User id</TableCell>
              <TableCell align="right">Join Date</TableCell>
              <TableCell align="right">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name || "N/A"}
                </TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.user_id}</TableCell>
                <TableCell align="right">
                  {new Date(row.createdAt).toLocaleDateString() || "N/A"}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.updatedAt).toLocaleDateString() || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
