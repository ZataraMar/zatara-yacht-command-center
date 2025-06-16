
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';

interface DownloadSectionProps {
  title: string;
  description: string;
  downloads: Array<{
    title: string;
    description: string;
    filename: string;
  }>;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  title,
  description,
  downloads
}) => {
  return (
    <section className="py-16 bg-zatara-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-zatara-navy mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloads.map((download, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-zatara-blue" />
                  <CardTitle className="text-zatara-navy">{download.title}</CardTitle>
                </div>
                <CardDescription>{download.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full gradient-zatara">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
