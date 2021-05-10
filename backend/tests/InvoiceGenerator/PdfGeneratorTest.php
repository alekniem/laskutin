<?php

namespace Tests\InvoiceGenerator;

use App\InvoiceGenerator\PdfGenerator;
use Exception;
use Tests\TestCase;

class PdfGeneratorTest extends TestCase
{
    private $removeFiles = [];

    protected function tearDown(): void
    {
        foreach ($this->removeFiles as $key => $filename) {
            if (is_file($filename))
                unlink($filename);
            unset($this->removeFiles[$key]);
        }

        parent::tearDown();
    }

    protected function getDirectory()
    {
        $directory = sys_get_temp_dir();
        $this->assertDirectoryExists($directory);
        return $directory;
    }

    protected function getFilenames(): array
    {
        $name = $this->getDirectory() . DIRECTORY_SEPARATOR . uniqid('test_');

        return [
            'aux' => $name . '.aux',
            'log' => $name . '.log',
            'pdf' => $name . '.pdf',
            'tex' => $name . '.tex',
        ];
    }

    protected function createLatexFile(array $filenames, string $latexCode)
    {
        foreach ($filenames as $filename) {
            $this->assertFileDoesNotExist($filename);
            $this->removeFiles[] = $filename;
        }

        $this->assertNotFalse(file_put_contents(
            $filenames['tex'],
            $latexCode
        ));

        $this->assertFileExists($filenames['tex']);
    }

    public function testGenerate()
    {
        $pdfGenerator = new PdfGenerator();
        $directory = $this->getDirectory();
        $filenames = $this->getFilenames();
        $latexCode = trim('
            \documentclass[a4paper,10pt]{letter}
            \begin{document}
            This is test
            \end{document}
        ');
        $this->createLatexFile($filenames, $latexCode);
        $pdfGenerator->generate($directory, $filenames['tex']);
    }

    public function testGenerate_DirectoryNotFound()
    {
        $pdfGenerator = new PdfGenerator();
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Directory not found');
        $pdfGenerator->generate('', '');
    }

    public function testGenerate_TexFileNotFound()
    {
        $pdfGenerator = new PdfGenerator();
        $directory = $this->getDirectory();
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Tex file not found');
        $pdfGenerator->generate($directory, '');
    }

    public function testGenerate_FailedToGeneratePdfFile()
    {
        $pdfGenerator = new PdfGenerator();
        $directory = $this->getDirectory();
        $filenames = $this->getFilenames();
        $this->createLatexFile($filenames, '');
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Failed to generate pdf file');
        $pdfGenerator->generate($directory, $filenames['tex']);
    }
}
