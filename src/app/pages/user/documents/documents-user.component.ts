import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DownloadService } from 'src/app/services/download.service';
import { SpacesService } from 'src/app/services/spaces.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
    selector: 'app-documents-user',
    templateUrl: './documents-user.component.html',
    styleUrls: ['./documents-user.component.scss'],
})
export class DocumentsUserComponent {
    uploadedFiles: any[] = [];
    filesSpaces: AWS.S3.Object[];
    files: any;
    categoriesItems = [
        {
            name: 'Cedolino',
            id: 'cedolino',
        },
        {
            name: 'Documenti Identità',
            id: 'documento-identita',
        },
        {
            name: 'Patente',
            id: 'patente',
        },
        {
            name: 'Permesso soggiorno',
            id: 'permesso-soggiorno',
        },
        {
            name: 'Altro',
            id: 'altro',
        },
    ];

    documentsForm = this.fb.group({
        userId: ['', [Validators.required]],
        category: ['', [Validators.required]],
        fiscalCode: ['', [Validators.required]],
    });
    currentFiscalCode: any;
    selectedCategory: any;
    subscription: Subscription;

    constructor(
        public fb: FormBuilder,
        private route: ActivatedRoute,
        private uploadService: UploadService,
        private downloadService: DownloadService,
        private spacesService: SpacesService,
    ) {
        this.route.queryParams.subscribe((params) => {
            this.documentsForm.patchValue({
                fiscalCode: params['fiscalCode'],
                userId: params['id'],
            });
            this.loadServices(params['id'], params['fiscalCode']);
        });
    }

    loadServices(idUser, fiscalCode) {
        const downloadServiceSubscription = this.downloadService
            .getDocumentsByUser(idUser, fiscalCode)
            .subscribe((files) => {
                this.files = files;
            });

        if (downloadServiceSubscription && this.subscription)
            this.subscription.add(downloadServiceSubscription);
    }

    getFileUrl(key: string): string {
        return this.spacesService.s3.getSignedUrl('getObject', {
            Bucket: this.spacesService.bucketName,
            Key: key,
            Expires: 60, // Tempo di scadenza del link in secondi
        });
    }

    uploadFiles(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }
    saveDocument() {
        const formData = new FormData();

        for (let file of this.uploadedFiles) {
            formData.append('files', file);
        }

        //TARGA
        const userId = this.documentsForm.value.userId;
        const category = this.selectedCategory?.id
            ? this.selectedCategory?.id
            : 'altro';
        const fiscalCode = this.documentsForm.value.fiscalCode;

        formData.append('userId', userId);
        formData.append('category', category);
        formData.append('fiscalCode', fiscalCode);

        this.uploadService.uploadDocuments(formData).subscribe(
            (response) => {
                this.loadServices(userId, fiscalCode);
            },
            (error) => {},
        );
    }

    getFileName(file) {
        return file.substring(file.lastIndexOf('/') + 1);
    }

    getFileExtension(file) {
        return file
            .substring(file.lastIndexOf('/') + 1)
            .split('.')
            .pop();
    }
}
