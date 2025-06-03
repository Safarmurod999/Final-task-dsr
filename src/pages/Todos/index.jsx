import React, { useState } from "react";
import useConnect from "./connect";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";
import Breadcrumb from "components/ui/Breadcrumb/Breadcrumb";
const Todos = () => {
    const {
        todos,
        handleNavigate,
        handleDelete
    } = useConnect();
    return (
        <section className="client">
            <div className="admin-container">
                <Breadcrumb title="Todos" />
                <div className="data-table-container">
                    <div className="table-search">
                        <div className="flex">
                            <Link
                                to={"/todos/create"}
                                className="form-button flex items-center text-white"
                            >
                                <IoAddSharp />
                                <span>add</span>
                            </Link>
                        </div>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.loading ? (
                                    <tr>
                                        <td colSpan={4}>
                                            <p className="loader"> Loading...</p>
                                        </td>
                                    </tr>
                                ) : todos && todos.todosList?.data?.length ? (
                                    todos.todosList.data.map((todo, index) => (
                                        <tr key={todo.id}>
                                            <td>{index + 1}</td>
                                            <td>{todo?.title}</td>
                                            <td>{todo?.description}</td>
                                            <td>
                                                <div className="table-actions">
                                                    <button onClick={() => handleNavigate(todo?.createdBy, todo?.id)}
                                                        className="action-btn"
                                                    >
                                                        <CiEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(todo?.createdBy, todo?.id)}
                                                        className="action-btn"
                                                    >
                                                        <MdDeleteOutline />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="no-data">
                                        <td colSpan={4}>
                                            <p className="text-center">No Data</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Todos;
