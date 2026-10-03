/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://builder.ckeditor.com/#installation/NoNgNARAzAdALDATBSBWAHHEAGbJUggDsq2UAnOagIy7rapHrlEiX6NG5SLpFRxU5RNmqYUEAKYA7FNjDBqYeUqUqAupCgBjEACM92AIYR1QA===
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autosave,
	Essentials,
	Paragraph,
	Autoformat,
	TextTransformation,
	LinkImage,
	Link,
	ImageBlock,
	ImageToolbar,
	BlockQuote,
	Bold,
	CloudServices,
	ImageUpload,
	ImageInsertViaUrl,
	AutoImage,
	Table,
	TableToolbar,
	Emoji,
	Mention,
	Heading,
	ImageTextAlternative,
	ImageCaption,
	ImageStyle,
	Indent,
	IndentBlock,
	ImageInline,
	Italic,
	List,
	AdjacentListsSupport,
	MediaEmbed,
	MediaEmbedStyle,
	MediaEmbedToolbar,
	TableCaption,
	TodoList,
	Underline,
	Fullscreen,
	Subscript,
	Superscript,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	HorizontalLine,
	Alignment,
	Style,
	GeneralHtmlSupport,
	ShowBlocks,
	BlockToolbar
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './EditorStyle.css';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

export default function CkEditor({handleEditorData, initialData}) {
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const { editorConfig } = useMemo(() => {
		if (!isLayoutReady) {
			return {};
		}

		return {
			editorConfig: {
				root: {
					placeholder: 'Type or paste your content here!',
					initialData: initialData || ''			
				},
				toolbar: {
					items: [
						'undo',
						'redo',
						'|',
						'showBlocks',
						'fullscreen',
						'|',
						'heading',
						'style',
						'|',
						'fontSize',
						'fontFamily',
						'fontColor',
						'fontBackgroundColor',
						'|',
						'bold',
						'italic',
						'underline',
						'subscript',
						'superscript',
						'|',
						'emoji',
						'horizontalLine',
						'link',
						'mediaEmbed',
						'insertTable',
						'blockQuote',
						'|',
						'alignment',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent'
					],
					shouldNotGroupWhenFull: false
				},
				plugins: [
					AdjacentListsSupport,
					Alignment,
					Autoformat,
					AutoImage,
					Autosave,
					BlockQuote,
					BlockToolbar,
					Bold,
					CloudServices,
					Emoji,
					Essentials,
					FontBackgroundColor,
					FontColor,
					FontFamily,
					FontSize,
					Fullscreen,
					GeneralHtmlSupport,
					Heading,
					HorizontalLine,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsertViaUrl,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					MediaEmbed,
					MediaEmbedStyle,
					MediaEmbedToolbar,
					Mention,
					Paragraph,
					ShowBlocks,
					Style,
					Subscript,
					Superscript,
					Table,
					TableCaption,
					TableToolbar,
					TextTransformation,
					TodoList,
					Underline
				],
				licenseKey: LICENSE_KEY,
				autosave: {
					/* See: https://ckeditor.com/docs/ckeditor5/latest/features/autosave.html */
				},
				blockToolbar: [
					'fontSize',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'|',
					'link',
					'insertTable',
					'|',
					'bulletedList',
					'numberedList',
					'outdent',
					'indent'
				],
				fontFamily: {
					supportAllValues: true
				},
				fontSize: {
					options: [10, 12, 14, 'default', 18, 20, 22],
					supportAllValues: true
				},
				fullscreen: {
					onEnterCallback: container =>
						container.classList.add(
							'editor-container',
							'editor-container_classic-editor',
							'editor-container_include-style',
							'editor-container_include-block-toolbar',
							'editor-container_include-fullscreen',
							'main-container'
						)
				},
				heading: {
					options: [
						{
							model: 'paragraph',
							title: 'Paragraph',
							class: 'ck-heading_paragraph'
						},
						{
							model: 'heading1',
							view: 'h1',
							title: 'Heading 1',
							class: 'ck-heading_heading1'
						},
						{
							model: 'heading2',
							view: 'h2',
							title: 'Heading 2',
							class: 'ck-heading_heading2'
						},
						{
							model: 'heading3',
							view: 'h3',
							title: 'Heading 3',
							class: 'ck-heading_heading3'
						},
						{
							model: 'heading4',
							view: 'h4',
							title: 'Heading 4',
							class: 'ck-heading_heading4'
						},
						{
							model: 'heading5',
							view: 'h5',
							title: 'Heading 5',
							class: 'ck-heading_heading5'
						},
						{
							model: 'heading6',
							view: 'h6',
							title: 'Heading 6',
							class: 'ck-heading_heading6'
						}
					]
				},
				htmlSupport: {
					allow: [
						{
							name: /^.*$/,
							styles: true,
							attributes: true,
							classes: true
						}
					]
				},
				image: {
					toolbar: ['toggleImageCaption', 'imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText']
				},
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				mediaEmbed: {
					toolbar: ['mediaEmbed:breakText', 'mediaEmbed:wrapText']
				},
				mention: {
					feeds: [
						{
							marker: '@',
							feed: [
								/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
							]
						}
					]
				},
				style: {
					definitions: [
						{
							name: 'Article category',
							element: 'h3',
							classes: ['category']
						},
						{
							name: 'Title',
							element: 'h2',
							classes: ['document-title']
						},
						{
							name: 'Subtitle',
							element: 'h3',
							classes: ['document-subtitle']
						},
						{
							name: 'Info box',
							element: 'p',
							classes: ['info-box']
						},
						{
							name: 'CTA Link Primary',
							element: 'a',
							classes: ['button', 'button--green']
						},
						{
							name: 'CTA Link Secondary',
							element: 'a',
							classes: ['button', 'button--black']
						},
						{
							name: 'Marker',
							element: 'span',
							classes: ['marker']
						},
						{
							name: 'Spoiler',
							element: 'span',
							classes: ['spoiler']
						}
					]
				},
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
				}
			}
		};
	}, [isLayoutReady]);

	return (
		<div className="main-container">
			<div className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar editor-container_include-fullscreen">
				<div className="editor-container__editor">{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} onChange={handleEditorData} />}</div>
			</div>
		</div>
	);
}
