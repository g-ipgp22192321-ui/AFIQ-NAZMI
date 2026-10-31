import React, { useState, useEffect } from 'react';
import { PbdStudent } from '../types';
import { INITIAL_STUDENTS, PBD_DESCRIPTORS } from '../data/dskpSamples';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  Sparkles, 
  BarChart3, 
  UserCheck, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export const PbdTracker: React.FC = () => {
  const [students, setStudents] = useState<PbdStudent[]>(() => {
    const saved = localStorage.getItem('edustudio_pbd_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [className, setClassName] = useState('5 Bijak (Sains)');
  const [learningStandard, setLearningStandard] = useState('3.1 Kemandirian Spesies Haiwan');
  const [newStudentName, setNewStudentName] = useState('');
  const [newTp, setNewTp] = useState(4);
  const [newSkill, setNewSkill] = useState('Aktiviti Pembentangan & Lembaran');

  useEffect(() => {
    localStorage.setItem('edustudio_pbd_students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newEntry: PbdStudent = {
      id: Date.now().toString(),
      nama: newStudentName.trim(),
      tahapPenguasaan: newTp,
      kemahiran: newSkill,
      catatanGuru: `Mencapai ${PBD_DESCRIPTORS[newTp]?.tahap} (${PBD_DESCRIPTORS[newTp]?.tajuk}) bagi topik ini.`,
      tarikh: new Date().toLocaleDateString('ms-MY'),
    };

    setStudents([newEntry, ...students]);
    setNewStudentName('');
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleUpdateTp = (id: string, tp: number) => {
    setStudents(
      students.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            tahapPenguasaan: tp,
            catatanGuru: `Mencapai ${PBD_DESCRIPTORS[tp]?.tahap} (${PBD_DESCRIPTORS[tp]?.tajuk}).`,
          };
        }
        return s;
      })
    );
  };

  // Generate automated constructive comments
  const handleAutoGenerateComments = () => {
    const updated = students.map((s) => {
      let ulasan = '';
      if (s.tahapPenguasaan === 6) {
        ulasan = 'Murid berpotensi tinggi, menjadi suri teladan dan mampu membimbing rakan sebaya secara kreatif.';
      } else if (s.tahapPenguasaan === 5) {
        ulasan = 'Penguasaan konsep sangat kukuh dan berkeyakinan tinggi dalam aktiviti KBAT berpusatkan murid.';
      } else if (s.tahapPenguasaan === 4) {
        ulasan = 'Melaksanakan kemahiran dengan tertib, sistematik dan menunjukkan kerjasama berpasukan yang baik.';
      } else if (s.tahapPenguasaan === 3) {
        ulasan = 'Mencapai tahap penguasaan minimum. Mampu menerangkan konsep asas dengan bimbingan berkala.';
      } else {
        ulasan = 'Perlu bimbingan berterusan dan latihan pemulihan secara rakan sebaya.';
      }
      return { ...s, catatanGuru: ulasan };
    });
    setStudents(updated);
  };

  // TP distribution stats
  const tpCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  students.forEach((s) => {
    if (tpCounts[s.tahapPenguasaan] !== undefined) {
      tpCounts[s.tahapPenguasaan]++;
    }
  });

  const exportCsv = () => {
    const headers = 'ID,Nama Murid,Tahap Penguasaan,Standard / Kemahiran,Catatan Guru,Tarikh\n';
    const rows = students
      .map(
        (s) =>
          `"${s.id}","${s.nama}","TP ${s.tahapPenguasaan}","${s.kemahiran}","${s.catatanGuru}","${s.tarikh}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Borang_Transit_PBD_${className.replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <Layers className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Borang Transit Pentaksiran Bilik Darjah (PBD)</h1>
            <p className="text-sm text-slate-500">
              Pengesanan Tahap Penguasaan TP 1 hingga TP 6 murid beserta penjana ulasan automatik
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoGenerateComments}
            className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Jana Ulasan Guru Pintar</span>
          </button>

          <button
            onClick={exportCsv}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Eksport CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Transit</span>
          </button>
        </div>
      </div>

      {/* Class Meta & Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* TP Distribution Overview (Left 4 cols) */}
        <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              Taburan Pencapaian Kelas
            </h3>
            <span className="text-xs font-bold text-slate-500">{students.length} Murid</span>
          </div>

          <div className="space-y-2">
            {[6, 5, 4, 3, 2, 1].map((tp) => {
              const count = tpCounts[tp] || 0;
              const percent = students.length > 0 ? Math.round((count / students.length) * 100) : 0;
              const desc = PBD_DESCRIPTORS[tp];

              return (
                <div key={tp} className="text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">
                      TP {tp} ({desc.tajuk})
                    </span>
                    <span className="text-slate-500 font-semibold">
                      {count} murid ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        tp >= 5 ? 'bg-emerald-500' : tp >= 3 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <Info className="w-3 h-3 text-emerald-600" />
              <span>Standard Prestasi Minimum (TP3)</span>
            </div>
            <p>
              Tahap minimum penguasaan ialah <strong>TP 3 (Tahu, Faham dan Boleh Buat)</strong>. 
              {students.filter((s) => s.tahapPenguasaan >= 3).length} daripada {students.length} murid ({Math.round((students.filter((s) => s.tahapPenguasaan >= 3).length / (students.length || 1)) * 100)}%) telah mencapai tahap penguasaan minimum.
            </p>
          </div>
        </div>

        {/* Student Table & Input (Right 8 cols) */}
        <div className="md:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Class Setting & Add Student Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between no-print">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                placeholder="Nama Kelas"
              />
              <input
                type="text"
                value={learningStandard}
                onChange={(e) => setLearningStandard(e.target.value)}
                className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 w-full sm:w-64"
                placeholder="Standard Kandungan"
              />
            </div>
          </div>

          {/* Quick Add Form */}
          <form onSubmit={handleAddStudent} className="p-4 border-b border-slate-200 bg-emerald-50/30 flex flex-col sm:flex-row gap-2 no-print">
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="Nama Murid Baharu..."
              className="p-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500/20 flex-grow"
            />
            <div className="flex items-center gap-2">
              <select
                value={newTp}
                onChange={(e) => setNewTp(Number(e.target.value))}
                className="p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              >
                {[1, 2, 3, 4, 5, 6].map((tp) => (
                  <option key={tp} value={tp}>TP {tp} - {PBD_DESCRIPTORS[tp].tajuk}</option>
                ))}
              </select>
              <button
                type="submit"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Murid</span>
              </button>
            </div>
          </form>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <th className="p-3 w-12 text-center">Bil</th>
                  <th className="p-3">Nama Murid</th>
                  <th className="p-3 w-28 text-center">Tahap (TP)</th>
                  <th className="p-3 hidden sm:table-cell">Kemahiran / Fokus</th>
                  <th className="p-3">Catatan / Ulasan Guru</th>
                  <th className="p-3 w-12 text-center no-print">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {students.map((student, idx) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 text-center text-slate-400 font-semibold">{idx + 1}</td>
                    <td className="p-3 font-semibold text-slate-900">{student.nama}</td>
                    <td className="p-3 text-center">
                      <select
                        value={student.tahapPenguasaan}
                        onChange={(e) => handleUpdateTp(student.id, Number(e.target.value))}
                        className={`font-black rounded-lg px-2 py-1 text-xs border cursor-pointer ${
                          PBD_DESCRIPTORS[student.tahapPenguasaan]?.warna || 'bg-slate-100'
                        }`}
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>TP {num}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-slate-600 hidden sm:table-cell">{student.kemahiran}</td>
                    <td className="p-3 text-slate-700 text-[11px] leading-relaxed">
                      {student.catatanGuru}
                    </td>
                    <td className="p-3 text-center no-print">
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                        title="Padam rekod"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
