"use client" // Wajib ditambahkan agar fungsi klik (onClick) bekerja

import { useRouter } from "next/navigation" // Import router untuk navigasi
import { 
  Book, 
  LayoutDashboard, 
  Search, 
  History, 
  Bookmark, 
  LogOut,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
  const router = useRouter() // Inisialisasi router

  // Fungsi untuk logout
  const handleLogout = () => {
    // Kamu bisa menghapus data sesi di sini jika perlu
    // localStorage.removeItem("user") 
    
    // Arahkan user kembali ke halaman login
    router.push("/login")
  }

  // Data dummy untuk tampilan
  const books = [
    { id: "1", title: "Atomic Habits", author: "James Clear", status: "Tersedia", category: "Self Dev" },
    { id: "2", title: "Clean Code", author: "Robert C. Martin", status: "Dipinjam", category: "Programming" },
    { id: "3", title: "The Psychology of Money", author: "Morgan Housel", status: "Tersedia", category: "Finance" },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Bagian Kiri */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b">
          <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
            <Book size={20} />
          </div>
          <span className="font-bold text-lg">E-Library</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {/* Warna diubah ke Emerald agar senada */}
          <Button variant="ghost" className="w-full justify-start gap-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
            <LayoutDashboard size={18} /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
            <Search size={18} /> Cari Buku
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
            <Bookmark size={18} /> Koleksi Saya
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
            <History size={18} /> Riwayat
          </Button>
        </nav>

        <div className="p-4 border-t">
          {/* Menambahkan fungsi handleLogout di sini */}
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} /> Keluar
          </Button>
        </div>
      </aside>

      {/* Main Content - Bagian Kanan */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header Dashboard */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-semibold text-slate-800">Ringkasan Perpustakaan</h2>
          <div className="flex items-center gap-4">
            <div className="text-right mr-2 hidden md:block">
              <p className="text-sm font-medium">User Kamu</p>
              <p className="text-xs text-slate-500">Student Account</p>
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>UK</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Isi Dashboard */}
        <div className="p-8 max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Selamat Datang Kembali! 👋</h1>
              <p className="text-slate-500">Berikut adalah daftar buku terbaru yang bisa kamu baca hari ini.</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2 text-white font-semibold">
              <Plus size={18} /> Tambah Buku
            </Button>
          </div>

          {/* Table Area */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-medium text-slate-700">Daftar Buku Terpopuler</h3>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input placeholder="Cari di tabel..." className="pl-9 h-9 text-sm focus-visible:ring-emerald-500" />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul Buku</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-100">{book.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={book.status === "Tersedia" ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100"}>
                        {book.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="link" className="text-emerald-600 p-0 h-auto font-semibold">Pinjam</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}