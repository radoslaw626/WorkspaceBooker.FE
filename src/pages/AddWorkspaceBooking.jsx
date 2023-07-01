import React, {useContext, useEffect, useState} from "react";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import {AppContext} from "../context/AppContext";


const Container = styled.div`
  margin: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  width: 100px;
  padding: 0.5rem;
  margin-top: 1rem;
`;

const NewBookingPage = () => {
    const [workers, setWorkers] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedWorker, setSelectedWorker] = useState("");
    const [selectedWorkspace, setSelectedWorkspace] = useState("");
    const navigate = useNavigate();
    const { refreshWorkspaces } = useContext(AppContext);


    useEffect(() => {
        const fetchWorkersAndWorkspaces = async () => {
            const workersRes = await axios.get('https://workspacebooker.azurewebsites.net/api/workers');
            const workspacesRes = await axios.get('https://workspacebooker.azurewebsites.net/api/workspaces/home');
            setWorkers(workersRes.data);
            setWorkspaces(workspacesRes.data.filter(workspace => workspace.status === 'free'));
            setSelectedWorker(workersRes.data[0]?.id || "");
            setSelectedWorkspace(workspacesRes.data[0]?.id || "");
        };
        fetchWorkersAndWorkspaces();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            WorkerId: selectedWorker,
            WorkspaceId: selectedWorkspace,
            DateFrom: startDate,
            DateDue: endDate,
        };
        await axios.post('https://workspacebooker.azurewebsites.net/api/workspace-bookings', payload);
        refreshWorkspaces();
        navigate('/');
    };

    return (
        <Container>
            <h1>New Booking</h1>
            <Form onSubmit={handleSubmit}>
                <Select value={selectedWorker} onChange={e => setSelectedWorker(e.target.value)}>
                    {workers.map(worker => <option key={worker.id} value={worker.id}>{worker.name} - {worker.email}</option>)}
                </Select>
                <Select value={selectedWorkspace} onChange={e => setSelectedWorkspace(e.target.value)}>
                    {workspaces.map(workspace => <option key={workspace.id} value={workspace.workspace.id}>{workspace.workspace.code}</option>)}
                </Select>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                <Button type="submit">Book</Button>
            </Form>
        </Container>
    );
};

export default NewBookingPage;