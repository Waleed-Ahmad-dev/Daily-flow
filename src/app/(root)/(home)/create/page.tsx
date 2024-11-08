/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/DatePicker';
import { Button } from '@/components/ui/button';
import { ReportPDF } from '@/components/ReportPDF';

interface Task {
  taskDescription: string;
  screenshot?: string; // Store screenshot as Base64 string
}

interface FormData {
  name: string;
  date: string;
  occupation: string;
  tasks: Task[];
}

export default function CreateReportPage() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([{ taskDescription: '', screenshot: '' }]);
  const { register, handleSubmit } = useForm<FormData>();

  const addTask = () => {
    setTasks([...tasks, { taskDescription: '', screenshot: '' }]);
  };

  const handleScreenshotChange = (index: number, file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setTasks(tasks.map((task, i) => (i === index ? { ...task, screenshot: base64 } : task)));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Report</h1>
      <form>
        <FormItem>
          <Label>Name</Label>
          <Input value={user?.fullName || ''} readOnly />
        </FormItem>
        <FormItem>
          <Label>Date</Label>
          <DatePicker />
        </FormItem>
        <FormItem>
          <Label>Occupation</Label>
          <Input {...register('occupation')} placeholder="Enter your occupation" />
        </FormItem>

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          {tasks.map((task, index) => (
            <div key={index} className="mb-4">
              <FormItem>
                <Label>Task {index + 1}</Label>
                <Input {...register(`tasks.${index}.taskDescription`)} placeholder="Task description" />
              </FormItem>
              <FormItem>
                <Label>Screenshot</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleScreenshotChange(index, e.target.files ? e.target.files[0] : undefined)}
                />
              </FormItem>
            </div>
          ))}
          <Button type="button" onClick={addTask} className="mt-2">
            Add Another Task
          </Button>
        </div>

        <div className="mt-6 space-x-2">
          <PDFDownloadLink
            document={
              <ReportPDF
                name={user?.fullName || ''}
                date={new Date().toLocaleDateString()}
                occupation={(document.getElementsByName('occupation')[0] as HTMLInputElement)?.value || ''}
                tasks={tasks}
              />
            }
            fileName={`Report_${new Date().toLocaleDateString()}.pdf`}
          >
            <Button type="button">Save as PDF</Button>
          </PDFDownloadLink>
        </div>
      </form>
    </div>
  );
}
