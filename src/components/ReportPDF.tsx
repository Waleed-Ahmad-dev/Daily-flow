/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 20, marginBottom: 10 },
  section: { marginBottom: 20 },
  task: { fontSize: 14, marginBottom: 10 },
  screenshot: { width: 200, height: 200, marginTop: 10 },
});

export const ReportPDF = ({ name, date, occupation, tasks }: any) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Report</Text>
      <Text>Name: {name}</Text>
      <Text>Date: {date}</Text>
      <Text>Occupation: {occupation}</Text> {/* Display occupation here */}

      {tasks.map((task: any, index: number) => (
        <View key={index} style={styles.section}>
          <Text style={styles.task}>Task {index + 1}: {task.taskDescription}</Text>
          {task.screenshot && <Image src={task.screenshot} style={styles.screenshot} />}
        </View>
      ))}
    </Page>
  </Document>
);