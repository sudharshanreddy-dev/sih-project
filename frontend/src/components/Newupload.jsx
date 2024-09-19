import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const VloggerDashboard = () => {
  const [places, setPlaces] = useState([])
  const [newPlace, setNewPlace] = useState({
    name: '',
    description: '',
    state: '',
    address: ''
  })
  const [editingPlace, setEditingPlace] = useState(null)
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)

  useEffect(() => {
    const savedPlaces = localStorage.getItem('places')
    if (savedPlaces) {
      setPlaces(JSON.parse(savedPlaces))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places))
  }, [places])

  const handleInputChange = (e, isNewPlace = false) => {
    const { name, value } = e.target
    if (isNewPlace) {
      setNewPlace(prev => ({ ...prev, [name]: value }))
    } else {
      setEditingPlace(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    const placeWithId = { ...newPlace, id: Date.now().toString() }
    setPlaces(prev => [...prev, placeWithId])
    setNewPlace({ name: '', description: '', state: '', address: '' })
    setIsAddFormOpen(false)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setPlaces(prev => prev.map(place => place.id === editingPlace.id ? editingPlace : place))
    setEditingPlace(null)
    setIsEditFormOpen(false)
  }

  const handleEdit = (place) => {
    setEditingPlace(place)
    setIsEditFormOpen(true)
  }

  const handleDelete = (id) => {
    setPlaces(prev => prev.filter(place => place.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <Dialog open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4 transition-colors duration-300 ease-in-out hover:bg-primary-dark">
            <Plus className="w-4 h-4 mr-2" />
            Add New Place
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Place</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-name" className="text-right">
                  Name of Place
                </label>
                <Input
                  id="new-name"
                  name="name"
                  value={newPlace.name}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-state" className="text-right">
                  State
                </label>
                <Input
                  id="new-state"
                  name="state"
                  value={newPlace.state}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-description" className="text-right">
                  Description
                </label>
                <Textarea
                  id="new-description"
                  name="description"
                  value={newPlace.description}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                  required
                  maxLength={200}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="new-address" className="text-right">
                  Address
                </label>
                <Input
                  id="new-address"
                  name="address"
                  value={newPlace.address}
                  onChange={(e) => handleInputChange(e, true)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="transition-colors duration-300 ease-in-out hover:bg-primary-dark">Save New Place</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Place</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-name" className="text-right">
                  Name of Place
                </label>
                <Input
                  id="edit-name"
                  name="name"
                  value={editingPlace?.name || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-state" className="text-right">
                  State
                </label>
                <Input
                  id="edit-state"
                  name="state"
                  value={editingPlace?.state || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-description" className="text-right">
                  Description
                </label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={editingPlace?.description || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                  maxLength={200}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="edit-address" className="text-right">
                  Address
                </label>
                <Input
                  id="edit-address"
                  name="address"
                  value={editingPlace?.address || ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="transition-colors duration-300 ease-in-out hover:bg-primary-dark">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <Card key={place.id} className="transition-transform duration-300 ease-in-out hover:scale-105">
            <CardHeader>
              <CardTitle>{place.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{place.description}</p>
              <p className="text-xs text-gray-500 mb-1">{place.state}</p>
              <p className="text-xs text-gray-500">{place.address}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEdit(place)} className="transition-colors duration-300 ease-in-out hover:bg-secondary">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(place.id)} className="transition-colors duration-300 ease-in-out hover:bg-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default VloggerDashboard