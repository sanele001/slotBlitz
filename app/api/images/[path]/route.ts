import { NextResponse } from 'next/server';
import { supabase } from '../../../../dbclient/superBaseClient';

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ path: string }> },
) {
	const { path: rawPath } = await params;
	const path = rawPath?.trim();

	if (!path) {
		return NextResponse.json(
			{ error: 'Image path is required.' },
			{ status: 400 },
		);
	}
	const imagePath = `compressed_Public/squareImages/${path}.jpg`;
	const { data, error } = await supabase.storage
		.from('gameThumbnails')
		.download(imagePath);
	if (!error && data) {
		return new Response(data, {
			headers: {
				'Content-Type': data.type || 'image/jpeg',
				'Cache-Control': 'public, max-age=86400',
			},
		});
	}

	return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
}
