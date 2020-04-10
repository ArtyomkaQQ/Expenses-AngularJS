import React, { Component } from "react";
import AppNav from "./AppNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Container,
    Input,
    Button,
    Label,
    FormGroup,
    Form,
} from "reactstrap";
import { Link, withRouter } from 'react-router-dom';

class ExpenseEdit extends Component {
    emptyItem = {
        id: '',
        description: '',
        category: 'Food',
        expensedate: new Date(),
        location: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            categories: [],
            expenses: [],
            date: new Date(),
            item: this.emptyItem,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("/api/categories");
        const body = await response.json();
        this.setState({ categories: body, isLoading: false });

        const expense = await (await fetch(`/api/expense/${this.props.match.params.id}`));
        this.setState({item: expense});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item, csrfToken} = this.state;
        item.id = this.props.match.params.id

        await fetch('/api/expense/' + this.props.match.params.id, {
          method: 'PUT',
          headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item),
        });

        console.log(item);
        this.props.history.push('/expenses');
    }

    handleDateChange(date) {
        let item = { ...this.state.item };
        item.expenseDate = date;
        this.setState({ item });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
        console.log(item);
    }

    async remove(id) {
        await fetch(`/api/expenses/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(() => {
            let updatedExpenses = [...this.state.expenses].filter(
                (i) => i.id !== id
            );
            this.setState({ expenses: updatedExpenses });
        });
    }

    render() {
        const title = <h3>Edit Expense</h3>;
        const {categories} =this.state;
        const {isLoading} = this.state;

        if (isLoading) return <div>Loading....</div>;

        let optionList = categories.map((category) => (
            <option value={category} key={category}>
                {category}
            </option>
        ));

        return (
            <div>
                <AppNav />
                <Container>
                    {title}

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="description">Title</Label>
                            <Input
                                type="description"
                                name="description"
                                id="description"
                                onChange={this.handleChange}
                                autoComplete="name"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="category">Category</Label>
                            <select name="category" onChange={this.handleChange}>{optionList}</select>
                        </FormGroup>

                        <FormGroup>
                            <Label for="expenseDate">Date</Label>
                            <DatePicker
                                name="expenseDate"
                                selected={this.state.item.expenseDate}
                                onChange={this.handleDateChange}
                            />
                        </FormGroup>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="location">Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    id="location"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Button color="primary" type="submit">
                                Save
              </Button>{" "}
                            <Button color="secondary" tag={Link} to="/">
                                Cancel
              </Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(ExpenseEdit);