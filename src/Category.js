import React, { Component } from 'react';
import AppNav from './AppNav';

class Category extends Component {
    state = {
        isLoading: true,
        Categories: []
    }

    async componentDidMount() {
        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({ Categories: body, isLoading: false });
    }

    async remove(id) {
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        }).then(() => {
            let updatedExpenses = [...this.state.Expsenses].filter(i => i.id !== id);
            this.setState({ Expsenses: updatedExpenses });
        });

    }

    render() {
        const { isLoading, Categories } = this.state;
        if (isLoading) return (<div>Loading...</div>);

        return (
            <div>
                <AppNav />
                <h2>Categories</h2> {
                    Categories.map(category =>
                        <div id={category.id} key={category}>
                            {category}
                        </div>
                    )

                }
            </div>
        );
    }
}

export default Category;