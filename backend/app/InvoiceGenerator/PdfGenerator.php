<?php

namespace App\InvoiceGenerator;

use Exception;

class PdfGenerator
{
    /**
     * Generate PDF file from the LaTeX file.
     *
     * @param  string  $directory  Output directory
     * @param  string  $texFilename  Filename of LaTex file
     *
     * @throws Exception  If parameters are invalid or generation fails
     */
    public function generate(string $directory, string $texFilename)
    {
        if (!is_dir($directory))
            throw new Exception("Directory not found");

        if (!is_file($texFilename))
            throw new Exception("Tex file not found");

        $command = "pdflatex -interaction nonstopmode -output-directory \"$directory\" \"$texFilename\"";

        exec($command, $output, $returnVar);

        if ($returnVar !== 0)
            throw new Exception("Failed to generate pdf file");
    }
}
