import React, { useState } from 'react'
import { Grid } from '@mui/material'
import CategoriesTable from '../components/table/CategoriesTable'
import TypesTable from '../components/table/TypesTable'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import AddType from '../components/modal/AddType'
import AddCategory from '../components/modal/AddCategory'
import Swal from 'sweetalert2'
import { resolveTo } from '@remix-run/router'
import UnitsTable from '../components/table/UnitsTable'
import AddUnit from '../components/modal/AddUnit'

const CategoryTypeUnit = () => {
    const [openAddType, setOpenAddType] = useState(false)
    const [openAddCategory, setOpenAddCategory] = useState(false)
    const [openAddUnit, setOpenAddUnit] = useState(false)
    const role = localStorage.getItem('role')

    const handleAddType = async (type) => { 
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post('http://localhost:5000/types', type, config) 

            Swal.fire({
                icon: 'success',
                title: 'Type Added!',
                text: 'The type has been added successfully.',
            })
        } catch (error) {
            console.error('Axios Request Error:', error)

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Type name must be unique. Please choose a different name.',
            })
        }
    }

    const handleAddCategory = async (category) => { 
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post('http://localhost:5000/categories', category, config) 

            Swal.fire({
                icon: 'success',
                title: 'Category Added!',
                text: 'The Category has been added successfully.',
                timer: 2000,
                timerProgressBar: true
            })
        } catch (error) {
            console.error('Axios Request Error:', error)

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Category name must be unique. Please choose a different name.',
                timer: 2000,
                timerProgressBar: true
            })
        }
    }

    const handleAddUnit = async (unit) => { 
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post('http://localhost:5000/units', unit, config) 

            Swal.fire({
                icon: 'success',
                title: 'Unit Added!',
                text: 'The Unit has been added successfully.',
                timer: 2000,
                timerProgressBar: true
            })
        } catch (error) {
            console.error('Axios Request Error:', error)

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Unit name must be unique. Please choose a different name.',
                timer: 2000,
                timerProgressBar: true
            })
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <div>
                    {role == 1 ? (
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            style={{ backgroundColor: "#FF9066", color: "#FFF", marginTop: "20px" }}
                            onClick={() => setOpenAddCategory(true)}
                        >
                            Category
                        </Button>
                    ) : null}
                    <CategoriesTable />
                </div>
            </Grid>

            <Grid item xs={4}>
                <div>
                    {role == 1 ? (
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            style={{ backgroundColor: "#FF9066", color: "#FFF", marginTop: "20px" }}
                            onClick={() => setOpenAddType(true)}
                        >
                            Type
                        </Button>
                    ) : null}
                    <TypesTable />
                </div>
            </Grid>

            <Grid item xs={4}>
                <div>
                    {role == 1 ? (
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            style={{ backgroundColor: "#FF9066", color: "#FFF", marginTop: "20px" }}
                            onClick={() => setOpenAddUnit(true)}
                        >
                            Unit
                        </Button>
                    ) : null}
                    <UnitsTable />
                </div>
            </Grid>

            <AddCategory open={openAddCategory} onAddCategory={handleAddCategory} onClose={() => setOpenAddCategory(false)} />
            <AddType open={openAddType} onAddType={handleAddType} onClose={() => setOpenAddType(false)} />
            <AddUnit open={openAddUnit} onAddUnit={handleAddUnit} onClose={() => setOpenAddUnit(false)} />

        </Grid>
    )
}

export default CategoryTypeUnit