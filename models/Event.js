import { collection, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { firestore } from '~/plugins/firebase'

class Event {
  constructor(data) {
    this.name = data.name || ''
    this.start = data.start || null
    this.end = data.end || null
    this.color = "blue"
    this.timed = true
  }

  toPlainObject() {
    return {
      name: this.name,
      start: this.start,
      end: this.end,
      color: "blue",
      timed: true,
    }
  }

  static async getAll() {
    const querySnapshot = await getDocs(collection(firestore, 'events'))
    const events = []
    querySnapshot.forEach(doc => {
      const eventData = doc.data()
      eventData.id = doc.id
      events.push(new Event(eventData))
    })
    return events
  }

  async save() {
    if (this.id) {
      await updateDoc(collection(firestore, 'events', this.id), this.toPlainObject())
    } else {
      const docRef = await addDoc(collection(firestore, 'events'), this.toPlainObject())
      this.id = docRef.id
    }
  }

  async delete() {
    if (this.id) {
      await deleteDoc(collection(firestore, 'events', this.id))
    }
  }
}

export default Event
