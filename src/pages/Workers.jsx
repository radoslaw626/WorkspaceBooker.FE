import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../components/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import {AppContext} from "../context/AppContext";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;



const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

function Workers() {

    const { theme, isDrawerOpen } = useContext(AppContext);
    const [workers, setWorkers] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [workerDetails, setWorkerDetails] = useState({
        name: '',
        email: '',
        position: ''
    });


    const ThemedTableCell = styled(TableCell)`
  ${({ theme }) => `
    color: ${theme === 'light' ? '#ffffff' : '#000000'};
    background-color: ${theme === 'dark' ? '#424242' : '#ffffff'};
  `}
`;

    useEffect(() => {
        fetchWorkers().then(data => setWorkers(data));
    }, []);

    const fetchWorkers = async () => {
        try {
            const res = await axios.get('https://workspacebooker.azurewebsites.net/api/workers');
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const addWorker = async (worker) => {
        try {
            worker = { ...worker, workerName: worker.name };
            delete worker.name;
            const res = await axios.post('https://workspacebooker.azurewebsites.net/api/workers', worker);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateWorker = async (id, worker) => {
        try {
            const res = await axios.put(`https://workspacebooker.azurewebsites.net/api/workers/${id}`, worker);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const deleteWorker = async (id) => {
        try {
            await axios.delete(`https://workspacebooker.azurewebsites.net/api/workers/${id}`);
            return id;
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (e) => {
        setWorkerDetails({ ...workerDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedWorker) {
            updateWorker(selectedWorker, workerDetails)
                .then(data => setWorkers(workers.map(w => w.id === selectedWorker ? data : w)));
            setSelectedWorker(null);
        } else {
            addWorker(workerDetails).then(data => setWorkers([...workers, data]));
        }
        setWorkerDetails({
            name: '',
            email: '',
            position: ''
        });
    };

    const handleSelect = (worker) => {
        setSelectedWorker(worker.id);
        setWorkerDetails({
            name: worker.name,
            email: worker.email,
            position: worker.position
        });
    }

    const handleDelete = (id) => {
        deleteWorker(id).then(removedId => setWorkers(workers.filter(w => w.id !== removedId)));
    }

    return (
        <Container>
            <h2>Workers</h2>
            {/*<Table>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>Name</th>*/}
            {/*        <th>Position</th>*/}
            {/*        <th>Email</th>*/}
            {/*        <th></th>*/}
            {/*        <th></th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {workers.map((worker) => (*/}
            {/*        <tr key={worker.id}>*/}
            {/*            <td>{worker.name}</td>*/}
            {/*            <td>{worker.position}</td>*/}
            {/*            <td>{worker.email}</td>*/}
            {/*            <td>*/}
            {/*                <Button onClick={() => handleSelect(worker)}>Edit</Button>*/}
            {/*            </td>*/}
            {/*            <td>*/}
            {/*                <Button variant="contained" onClick={() => handleDelete(worker.id)}>Delete</Button>*/}
            {/*            </td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</Table>*/}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <ThemedTableCell>Name</ThemedTableCell>
                            <ThemedTableCell align="right">Position</ThemedTableCell>
                            <ThemedTableCell align="right">Email</ThemedTableCell>
                            <ThemedTableCell align="right"></ThemedTableCell>
                            <ThemedTableCell align="right"></ThemedTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workers.map((worker) => (
                            <TableRow
                                key={worker.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <ThemedTableCell component="th" scope="row">
                                    {worker.name}
                                </ThemedTableCell>
                                <ThemedTableCell align="right">{worker.position}</ThemedTableCell>
                                <ThemedTableCell align="right">{worker.email}</ThemedTableCell>
                                <ThemedTableCell align="right">
                                    <Button onClick={() => handleSelect(worker)}>Edit</Button>
                                </ThemedTableCell>
                                <ThemedTableCell align="left">
                                    <Button variant="warning" onClick={() => handleDelete(worker.id)}>Delete</Button>
                                </ThemedTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <div>
                    <TextField variant="filled" type="text" name="name" value={workerDetails.name} onChange={handleInputChange} />
                    </div>
                </label>
                <label>
                    Email:
                    <div>
                    <TextField variant="filled" type="email" name="email" value={workerDetails.email} onChange={handleInputChange} />
                    </div>
                </label>
                <label>
                    Position:
                    <div>
                    <TextField variant="filled" type="text" name="position" value={workerDetails.position} onChange={handleInputChange} />
                    </div>
                </label>
                <Button type="submit">{selectedWorker ? 'Update' : 'Add'} Worker</Button>
            </Form>
        </Container>
    );
}

export default Workers;