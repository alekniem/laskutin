<?php

namespace App\InvoiceGenerator;

use Exception;

class FileOperation
{
    /**
     * Load contents from the file.
     *
     * @param  string  $filename
     *
     * @return string
     *
     * @throws Exception If the file does not exist or the file does not have contents
     */
    public function loadFile(string $filename): string
    {
        if (!is_file($filename))
            throw new Exception("File does not exist");

        if (!$contents = file_get_contents($filename))
            throw new Exception("Failed to load file");

        return $contents;
    }

    /**
     * Save contents to the file.
     *
     * @param  string  $filename
     * @param  string  $contents
     *
     * @throws Exception If the file already exists or the file cannot be saved
     */
    public function saveFile(string $filename, string $contents)
    {
        if (is_file($filename))
            throw new Exception("File already exists");

        if (@file_put_contents($filename, $contents) === false)
            throw new Exception("Failed to save file");
    }
}
