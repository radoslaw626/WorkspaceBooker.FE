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
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const ThemedTableCell = styled(TableCell)`
  ${({ theme }) => `
    color: ${theme === 'light' ? '#ffffff' : '#000000'};
    background-color: ${theme === 'dark' ? '#424242' : '#ffffff'};
  `}
`;

function Workspaces() {
    const { theme, isDrawerOpen } = useContext(AppContext);
    const [workspaces, setWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [workspaceDetails, setWorkspaceDetails] = useState({
        city: '',
        code: ''
    });

    useEffect(() => {
        fetchWorkspaces().then(data => setWorkspaces(data));
    }, []);

    const fetchWorkspaces = async () => {
        try {
            const res = await axios.get('https://workspacebooker.azurewebsites.net/api/workspaces');
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const addWorkspace = async (workspace) => {
        try {
            const res = await axios.post('https://workspacebooker.azurewebsites.net/api/workspaces', workspace);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateWorkspace = async (id, workspace) => {
        try {
            const res = await axios.put(`https://workspacebooker.azurewebsites.net/api/workspaces/${id}`, workspace);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const deleteWorkspace = async (id) => {
        try {
            await axios.delete(`https://workspacebooker.azurewebsites.net/api/workspaces/${id}`);
            return id;
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (e) => {
        setWorkspaceDetails({ ...workspaceDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedWorkspace) {
            updateWorkspace(selectedWorkspace, workspaceDetails)
                .then(data => setWorkspaces(workspaces.map(w => w.id === selectedWorkspace ? data : w)));
            setSelectedWorkspace(null);
        } else {
            addWorkspace(workspaceDetails).then(data => setWorkspaces([...workspaces, data]));
        }
        setWorkspaceDetails({
            city: '',
            code: ''
        });
    };

    const handleSelect = (workspace) => {
        setSelectedWorkspace(workspace.id);
        setWorkspaceDetails({
            city: workspace.city,
            code: workspace.code
        });
    }

    const handleDelete = (id) => {
        deleteWorkspace(id).then(removedId => setWorkspaces(workspaces.filter(w => w.id !== removedId)));
    }

    return (
        <Container>
            <h2>Workspaces</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <ThemedTableCell>City</ThemedTableCell>
                            <ThemedTableCell align="right">Code</ThemedTableCell>
                            <ThemedTableCell align="right"></ThemedTableCell>
                            <ThemedTableCell align="right"></ThemedTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workspaces.map((workspace) => (
                            <TableRow
                                key={workspace.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <ThemedTableCell component="th" scope="row">
                                    {workspace.city}
                                </ThemedTableCell>
                                <ThemedTableCell align="right">{workspace.code}</ThemedTableCell>
                                <ThemedTableCell align="right">
                                    <Button onClick={() => handleSelect(workspace)}>Edit</Button>
                                </ThemedTableCell>
                                <ThemedTableCell align="left">
                                    <Button variant="warning" onClick={() => handleDelete(workspace.id)}>Delete</Button>
                                </ThemedTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Form onSubmit={handleSubmit}>
                <label>
                    City:
                    <div>
                        <TextField variant="filled" type="text" name="city" value={workspaceDetails.city} onChange={handleInputChange} />
                    </div>
                </label>
                <label>
                    Code:
                    <div>
                        <TextField variant="filled" type="text" name="code" value={workspaceDetails.code} onChange={handleInputChange} />
                    </div>
                </label>
                <Button type="submit">{selectedWorkspace ? 'Update' : 'Add'} Workspace</Button>
            </Form>
        </Container>
    );
}

export default Workspaces;