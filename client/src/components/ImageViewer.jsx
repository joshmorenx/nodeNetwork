import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.5;
const DOUBLE_CLICK_ZOOM = 2.5;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const scaleIn = keyframes`
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
`;

const overlayButtonSx = {
    color: '#f1f5f9',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.14)' },
};

/**
 * Full-featured lightbox.
 *
 * Keeps the original API (image + setImgClickedPath) working, and adds an
 * optional `images` collection so the viewer can navigate prev/next, plus an
 * optional `alt` text. Zoom with the wheel, the +/- buttons or a double click;
 * drag to pan while zoomed; Esc closes, arrows navigate, 0 resets the zoom.
 */
export default function ImageViewer({ image, setImgClickedPath, images, alt }) {
    const [img, setImg] = useState(null);
    const [zoom, setZoom] = useState(MIN_ZOOM);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const dragRef = useRef(null);
    const stageRef = useRef(null);

    const open = Boolean(img);

    const currentIndex = useMemo(() => {
        if (!img || !Array.isArray(images) || images.length === 0) return -1;
        return images.findIndex((item) => item === img);
    }, [img, images]);

    const total = Array.isArray(images) ? images.length : 0;
    const canNavigate = currentIndex >= 0 && total > 1;

    // Sync with the parent-controlled image prop.
    useEffect(() => {
        setImg(image || null);
    }, [image]);

    // Reset zoom/pan whenever a different image is shown.
    useEffect(() => {
        setZoom(MIN_ZOOM);
        setPan({ x: 0, y: 0 });
        setDragging(false);
        dragRef.current = null;
    }, [img]);

    // Re-show the hint (with its auto-hide timer) for every new image.
    useEffect(() => {
        if (!open) return;
        setShowHint(true);
        const timer = setTimeout(() => setShowHint(false), 5000);
        return () => clearTimeout(timer);
    }, [img, open]);

    // Lock body scroll while the viewer is open.
    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    const close = useCallback(() => {
        setImg(null);
        if (typeof setImgClickedPath === 'function') {
            setImgClickedPath(null);
        }
    }, [setImgClickedPath]);

    const goTo = useCallback((nextIndex) => {
        if (!Array.isArray(images) || images.length === 0) return;
        const wrapped = ((nextIndex % images.length) + images.length) % images.length;
        setImg(images[wrapped]);
    }, [images]);

    // Scroll-wheel zoom (attached natively so preventDefault works).
    useEffect(() => {
        const stage = stageRef.current;
        if (!open || !stage) return;
        const onWheel = (event) => {
            event.preventDefault();
            const next = clamp(zoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP), MIN_ZOOM, MAX_ZOOM);
            setZoom(next);
            if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
        };
        stage.addEventListener('wheel', onWheel, { passive: false });
        return () => stage.removeEventListener('wheel', onWheel);
    }, [open, zoom]);

    // Keyboard shortcuts.
    useEffect(() => {
        if (!open) return;
        const onKey = (event) => {
            switch (event.key) {
                case 'Escape':
                    close();
                    break;
                case 'ArrowLeft':
                    if (canNavigate) goTo(currentIndex - 1);
                    break;
                case 'ArrowRight':
                    if (canNavigate) goTo(currentIndex + 1);
                    break;
                case '+':
                case '=':
                    setZoom((z) => clamp(z + ZOOM_STEP, MIN_ZOOM, MAX_ZOOM));
                    break;
                case '-':
                case '_':
                    setZoom((z) => clamp(z - ZOOM_STEP, MIN_ZOOM, MAX_ZOOM));
                    break;
                case '0':
                    setZoom(MIN_ZOOM);
                    setPan({ x: 0, y: 0 });
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, canNavigate, currentIndex, goTo, close]);

    const resetZoom = () => {
        setZoom(MIN_ZOOM);
        setPan({ x: 0, y: 0 });
    };

    const handlePointerDown = (event) => {
        if (zoom <= MIN_ZOOM) return;
        event.stopPropagation();
        setDragging(true);
        dragRef.current = { startX: event.clientX, startY: event.clientY, panX: pan.x, panY: pan.y };
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (!dragging || !dragRef.current) return;
        const { startX, startY, panX, panY } = dragRef.current;
        setPan({ x: panX + (event.clientX - startX), y: panY + (event.clientY - startY) });
    };

    const handlePointerUp = () => {
        setDragging(false);
        dragRef.current = null;
    };

    const handleDoubleClick = () => {
        if (zoom > MIN_ZOOM) {
            resetZoom();
        } else {
            setZoom(DOUBLE_CLICK_ZOOM);
            setPan({ x: 0, y: 0 });
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(img, { mode: 'cors' });
            if (!response.ok) throw new Error('download failed');
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName || 'imagen';
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            // Cross-origin images may not be fetchable: open them instead.
            window.open(img, '_blank');
        }
    };

    const handleOpenNewTab = () => {
        window.open(img, '_blank');
    };

    const fileName = useMemo(() => {
        if (!img) return '';
        try {
            const clean = img.split('?')[0].split('#')[0];
            const name = decodeURIComponent(clean.split('/').pop() || '');
            if (name && !clean.startsWith('data:') && !clean.startsWith('blob:')) return name;
            return '';
        } catch (error) {
            return '';
        }
    }, [img]);

    if (!open) return null;

    const zoomPercent = Math.round(zoom * 100);
    const canDrag = zoom > MIN_ZOOM;
    const hintText = canNavigate
        ? 'Rueda para zoom · Doble clic para ampliar · ← → para navegar'
        : 'Rueda para zoom · Doble clic para ampliar';

    return (
        <Box
            className="iv-root"
            onClick={close}
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2000,
                backgroundColor: 'rgba(0, 0, 0, 0.94)',
                animation: `${fadeIn} 0.2s ease`,
            }}
        >
            {/* Stage: image + wheel-zoom area */}
            <Box
                ref={stageRef}
                className="iv-stage"
                onDoubleClick={handleDoubleClick}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onClick={(event) => event.stopPropagation()}
                    sx={{
                        cursor: canDrag ? (dragging ? 'grabbing' : 'grab') : 'default',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: 'none',
                        lineHeight: 0,
                        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                        transition: dragging ? 'none' : 'transform 0.2s ease',
                    }}
                >
                    <img
                        src={img}
                        alt={alt || 'Imagen'}
                        draggable={false}
                        style={{
                            display: 'block',
                            maxWidth: '92vw',
                            maxHeight: '84vh',
                            objectFit: 'contain',
                            borderRadius: '6px',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                            animation: `${scaleIn} 0.22s ease`,
                        }}
                    />
                </Box>
            </Box>

            {/* Prev / next arrows */}
            {canNavigate && (
                <>
                    <Tooltip title="Anterior (←)">
                        <IconButton
                            aria-label="Imagen anterior"
                            onClick={(event) => {
                                event.stopPropagation();
                                goTo(currentIndex - 1);
                            }}
                            size="large"
                            sx={{
                                position: 'absolute',
                                left: 14,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 3,
                                color: '#f1f5f9',
                                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                                '&:hover': { backgroundColor: 'rgba(15, 23, 42, 0.9)' },
                            }}
                        >
                            <ChevronLeftIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Siguiente (→)">
                        <IconButton
                            aria-label="Imagen siguiente"
                            onClick={(event) => {
                                event.stopPropagation();
                                goTo(currentIndex + 1);
                            }}
                            size="large"
                            sx={{
                                position: 'absolute',
                                right: 14,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 3,
                                color: '#f1f5f9',
                                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                                '&:hover': { backgroundColor: 'rgba(15, 23, 42, 0.9)' },
                            }}
                        >
                            <ChevronRightIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </>
            )}

            {/* Top bar: counter / filename + close */}
            <Box
                className="iv-topbar"
                onClick={(event) => event.stopPropagation()}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 3,
                    p: 1.5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.55), transparent)',
                }}
            >
                {canNavigate ? (
                    <Typography
                        sx={{
                            color: '#e2e8f0',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            fontVariantNumeric: 'tabular-nums',
                        }}
                    >
                        {currentIndex + 1} / {total}
                    </Typography>
                ) : fileName ? (
                    <Typography
                        sx={{
                            color: '#e2e8f0',
                            fontSize: '0.85rem',
                            maxWidth: '50vw',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {fileName}
                    </Typography>
                ) : (
                    <Box />
                )}
                <Tooltip title="Cerrar (Esc)">
                    <IconButton size="small" aria-label="Cerrar" onClick={close} sx={overlayButtonSx}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Transient usage hint */}
            <Box
                onClick={(event) => event.stopPropagation()}
                sx={{
                    position: 'absolute',
                    bottom: 92,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    color: 'rgba(226, 232, 240, 0.85)',
                    fontSize: '0.78rem',
                    opacity: showHint ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                }}
            >
                {hintText}
            </Box>

            {/* Bottom bar: zoom controls + download + open in new tab */}
            <Box
                className="iv-bottombar"
                onClick={(event) => event.stopPropagation()}
                sx={{
                    position: 'absolute',
                    bottom: 18,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.25,
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    borderRadius: '999px',
                    px: 1,
                    py: 0.5,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(8px)',
                }}
            >
                <Tooltip title="Alejar (-)">
                    <IconButton
                        size="small"
                        aria-label="Alejar"
                        onClick={() => setZoom((z) => clamp(z - ZOOM_STEP, MIN_ZOOM, MAX_ZOOM))}
                        sx={overlayButtonSx}
                    >
                        <ZoomOutIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restablecer zoom (0)">
                    <Box
                        role="button"
                        tabIndex={0}
                        aria-label="Restablecer zoom"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                resetZoom();
                            }
                        }}
                        onClick={resetZoom}
                        sx={{
                            minWidth: 54,
                            px: 1,
                            py: 0.5,
                            textAlign: 'center',
                            cursor: 'pointer',
                            borderRadius: 2,
                            color: '#e2e8f0',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            fontVariantNumeric: 'tabular-nums',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.12)' },
                        }}
                    >
                        {zoomPercent}%
                    </Box>
                </Tooltip>
                <Tooltip title="Acercar (+)">
                    <IconButton
                        size="small"
                        aria-label="Acercar"
                        onClick={() => setZoom((z) => clamp(z + ZOOM_STEP, MIN_ZOOM, MAX_ZOOM))}
                        sx={overlayButtonSx}
                    >
                        <ZoomInIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Box sx={{ width: 1, height: 22, backgroundColor: 'rgba(255, 255, 255, 0.18)', mx: 0.5 }} />
                <Tooltip title="Descargar">
                    <IconButton size="small" aria-label="Descargar" onClick={handleDownload} sx={overlayButtonSx}>
                        <DownloadIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Abrir en una pestaña nueva">
                    <IconButton size="small" aria-label="Abrir en una pestaña nueva" onClick={handleOpenNewTab} sx={overlayButtonSx}>
                        <OpenInNewIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restablecer (0)">
                    <IconButton size="small" aria-label="Restablecer" onClick={resetZoom} sx={overlayButtonSx}>
                        <RestartAltIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}

ImageViewer.propTypes = {
    image: PropTypes.string,
    setImgClickedPath: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.string),
    alt: PropTypes.string,
};
