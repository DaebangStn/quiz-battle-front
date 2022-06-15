import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {quiz_list} from "../_actions/pageAction";

export default function BriefAvailableGames() {
  const [list, setList] = useState([]);
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();

  let dottedElement;
  if(more){
      dottedElement =
          <TableRow>
              <TableCell>...</TableCell>
              <TableCell>...</TableCell>
              <TableCell>...</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
  }else{
      dottedElement = <></>;
  }

  useEffect(() => {
      dispatch(quiz_list())
          .then((res) => {
              console.log(res);
              res.payload.forEach((row, j) => {
                  row.memberString =
                      row.participants.map(a=>a.username).toString();
              })
              setList(res.payload.slice(0, 5));
              setMore((res.payload.length > 5));
        })
        .catch((err) => {
            console.log(err);
        })
      // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Title>참가 가능한 게임</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>방장</TableCell>
            <TableCell>참여자</TableCell>
            <TableCell>종류</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.host.username}</TableCell>
              <TableCell>{row.memberString}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
            {dottedElement}
        </TableBody>
      </Table>
      <Link color="primary" href="/quiz/available" sx={{ mt: 3 }}>
        더보기
      </Link>
    </React.Fragment>
  );
}
